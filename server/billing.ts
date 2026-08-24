// server/billing.ts — Stripe billing routes + plan access control
import express, { Router } from "express";
import Stripe from "stripe";
import { storage } from "./storage.js";
import { authMiddleware, type AuthedRequest } from "./auth.js";
import { PLAN_LIMITS, type PlanTier } from "@shared/schema";

const stripeKey = process.env.STRIPE_SECRET_KEY || "";
function getStripe(): Stripe {
  if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");
  return new Stripe(stripeKey);
}

// Price env vars — each tier has a monthly and annual price
export const PRICE_ENV_VARS = {
  basic_monthly: process.env.STRIPE_PRICE_BASIC_MONTHLY || "",
  basic_annual: process.env.STRIPE_PRICE_BASIC_ANNUAL || "",
  pro_monthly: process.env.STRIPE_PRICE_PRO_MONTHLY || "",
  pro_annual: process.env.STRIPE_PRICE_PRO_ANNUAL || "",
} as const;

const ANNUAL_SAVINGS = {
  basic: { monthly: 14, annual: 120, savings: 48 },
  pro: { monthly: 24, annual: 216, savings: 72 },
};

export function accessForPlan(planTier: string): { maxStudents: number; features: string[] } {
  const tier = planTier as PlanTier;
  return {
    maxStudents: PLAN_LIMITS[tier] || 1,
    features:
      tier === "free"
        ? ["1 student", "Quarterly diagnostics", "Basic curriculum"]
        : tier === "basic"
          ? ["3 students", "All diagnostics", "Full curriculum", "Practice sessions", "Growth tracking"]
          : ["10 students", "Everything in Basic", "Advanced analytics", "Priority support", "All subjects"],
  };
}

export function registerBillingRoutes(): Router {
  const router = Router();

  // POST /api/billing/create-checkout-session
  router.post("/create-checkout-session", authMiddleware, async (req: AuthedRequest, res) => {
    try {
      const { plan, interval } = req.body as { plan: "basic" | "pro"; interval: "monthly" | "annual" };
      const priceKey = `${plan}_${interval}` as keyof typeof PRICE_ENV_VARS;
      const priceId = PRICE_ENV_VARS[priceKey];
      if (!priceId) {
        return res.status(400).json({ error: "Invalid plan or interval" });
      }

      const user = await storage.getUserById(req.userId!);
      if (!user) return res.status(404).json({ error: "User not found" });

      const stripe = getStripe();
      const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        customer_email: user.stripeCustomerId ? undefined : user.email,
        customer: user.stripeCustomerId || undefined,
        line_items: [{ price: priceId, quantity: 1 }],
        success_url: `${process.env.APP_URL || "http://localhost:5173"}/settings?upgrade=success`,
        cancel_url: `${process.env.APP_URL || "http://localhost:5173"}/settings?upgrade=cancelled`,
        metadata: { userId: String(user.id), plan, interval },
      });

      res.json({ url: session.url });
    } catch (err) {
      console.error("[checkout]", err);
      res.status(500).json({ error: "Failed to create checkout session" });
    }
  });

  // POST /api/billing/portal-session
  router.post("/portal-session", authMiddleware, async (req: AuthedRequest, res) => {
    try {
      const user = await storage.getUserById(req.userId!);
      if (!user || !user.stripeCustomerId) {
        return res.status(400).json({ error: "No billing account found" });
      }
      const stripe = getStripe();
      const session = await stripe.billingPortal.sessions.create({
        customer: user.stripeCustomerId,
        return_url: `${process.env.APP_URL || "http://localhost:5173"}/settings`,
      });
      res.json({ url: session.url });
    } catch (err) {
      console.error("[portal]", err);
      res.status(500).json({ error: "Failed to create portal session" });
    }
  });

  // POST /api/billing/webhook — Stripe webhook handler
  router.post("/webhook", express.raw({ type: "application/json" }), async (req, res) => {
    const sig = req.headers["stripe-signature"] as string;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";
    if (!webhookSecret || !sig) {
      return res.status(400).json({ error: "Missing signature or secret" });
    }

    try {
      const stripe = getStripe();
      const event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);

      switch (event.type) {
        case "checkout.session.completed": {
          const session = event.data.object as Stripe.Checkout.Session;
          const userId = parseInt(session.metadata?.userId || "0");
          const plan = session.metadata?.plan || "free";
          const interval = session.metadata?.interval || "monthly";
          if (userId && session.customer) {
            await storage.updateUserStripeInfo(
              userId,
              session.customer as string,
              plan,
              interval,
            );
          }
          break;
        }
        case "customer.subscription.deleted": {
          const sub = event.data.object as Stripe.Subscription;
          const user = await storage.getUserByStripeCustomerId(sub.customer as string);
          if (user) {
            await storage.updateUserStripeInfo(user.id, user.stripeCustomerId!, "free", "monthly");
          }
          break;
        }
      }

      res.json({ received: true });
    } catch (err) {
      console.error("[webhook]", err);
      res.status(400).json({ error: "Webhook error" });
    }
  });

  // GET /api/billing/annual-savings — for the upsell card in settings
  router.get("/annual-savings", authMiddleware, async (req: AuthedRequest, res) => {
    try {
      const user = await storage.getUserById(req.userId!);
      if (!user) return res.status(404).json({ error: "User not found" });
      const plan = user.planTier as "basic" | "pro";
      const savings = ANNUAL_SAVINGS[plan];
      if (!savings) return res.json({ eligible: false });
      res.json({ eligible: user.subscriptionInterval === "monthly", ...savings });
    } catch (err) {
      console.error("[annual-savings]", err);
      res.status(500).json({ error: "Failed" });
    }
  });

  return router;
}
