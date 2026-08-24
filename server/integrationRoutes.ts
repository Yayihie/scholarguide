// server/integrationRoutes.ts — Cron endpoints + integration routes
// All cron endpoints are protected by CRON_SECRET via x-cron-secret header.
import { Router } from "express";
import { cronAuthMiddleware } from "./auth.js";
import {
  sendQuarterEndNudge,
  sendWeeklyPracticeReminder,
  processWeeklyDigests,
  isEmailConfigured,
} from "./email.js";
import { storage } from "./storage.js";

export function registerIntegrationRoutes(): Router {
  const router = Router();

  // POST /api/cron/quarter-end-nudge
  // Sends nudge emails to all users whose students are starting a new quarter.
  router.post("/cron/quarter-end-nudge", cronAuthMiddleware, async (_req, res) => {
    try {
      if (!isEmailConfigured()) {
        return res.json({ sent: 0, skipped: 0, message: "Email not configured" });
      }
      const { getDb } = await import("./db.js");
      const db = getDb();
      const { users, students } = await import("@shared/schema");
      const allUsers = await db.select().from(users);
      let sent = 0;
      for (const user of allUsers) {
        const userStudents = await storage.getStudentsByUserId(user.id);
        for (const student of userStudents) {
          // Determine current quarter based on month
          const month = new Date().getMonth();
          const quarter = Math.floor(month / 3) + 1;
          await sendQuarterEndNudge(user.email, student.firstName, student.id, quarter);
          sent++;
        }
      }
      res.json({ sent, message: "Quarter-end nudges processed" });
    } catch (err) {
      console.error("[cron/quarter-end]", err);
      res.status(500).json({ error: "Failed" });
    }
  });

  // POST /api/cron/weekly-practice-reminder
  router.post("/cron/weekly-practice-reminder", cronAuthMiddleware, async (_req, res) => {
    try {
      if (!isEmailConfigured()) {
        return res.json({ sent: 0, skipped: 0, message: "Email not configured" });
      }
      const { getDb } = await import("./db.js");
      const db = getDb();
      const { users, emailPreferences } = await import("@shared/schema");
      const { eq, and } = await import("drizzle-orm");

      const usersWithPrefs = await db
        .select({ user: users, prefs: emailPreferences })
        .from(users)
        .leftJoin(emailPreferences, eq(users.id, emailPreferences.userId))
        .where(eq(emailPreferences.weeklyPractice, true));

      let sent = 0;
      for (const { user, prefs } of usersWithPrefs) {
        if (prefs && !prefs.weeklyPractice) continue;
        const userStudents = await storage.getStudentsByUserId(user.id);
        for (const student of userStudents) {
          await sendWeeklyPracticeReminder(user.email, student.firstName, student.id);
          sent++;
        }
      }
      res.json({ sent, message: "Weekly practice reminders processed" });
    } catch (err) {
      console.error("[cron/weekly-practice]", err);
      res.status(500).json({ error: "Failed" });
    }
  });

  // POST /api/cron/weekly-digest  — PRIORITY 2a
  // Sends a weekly digest email to all users with the preference enabled.
  // Summarizes what each student worked on this week + what's next.
  router.post("/cron/weekly-digest", cronAuthMiddleware, async (_req, res) => {
    try {
      const result = await processWeeklyDigests();
      res.json({
        ...result,
        message: `Weekly digests: ${result.sent} sent, ${result.skipped} skipped, ${result.errors} errors`,
      });
    } catch (err) {
      console.error("[cron/weekly-digest]", err);
      res.status(500).json({ error: "Failed to process weekly digests" });
    }
  });

  return router;
}
