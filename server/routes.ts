// server/routes.ts — Auth routes + user profile + student CRUD
import { Router } from "express";
import { storage } from "./storage.js";
import { hashPassword, verifyPassword, signToken, authMiddleware, type AuthedRequest } from "./auth.js";
import { loginSchema, signupSchema, studentSchema, PLAN_LIMITS, type PlanTier } from "@shared/schema";
import { generateLessonPlan, generateCurriculum } from "./gemini.js";

export function registerAuthRoutes(): Router {
  const router = Router();

  // POST /api/auth/signup
  router.post("/signup", async (req: AuthedRequest, res) => {
    try {
      const parsed = signupSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Invalid input", details: parsed.error.flatten() });
      }
      const { email, password } = parsed.data;
      const existing = await storage.getUserByEmail(email);
      if (existing) {
        return res.status(409).json({ error: "An account with that email already exists" });
      }
      const passwordHash = await hashPassword(password);
      const user = await storage.createUser({ email, passwordHash });
      const token = signToken(user.id);
      res.status(201).json({ token, user: { id: user.id, email: user.email, planTier: user.planTier } });
    } catch (err) {
      console.error("[signup]", err);
      res.status(500).json({ error: "Failed to create account" });
    }
  });

  // POST /api/auth/login
  router.post("/login", async (req: AuthedRequest, res) => {
    try {
      const parsed = loginSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Invalid input" });
      }
      const { email, password } = parsed.data;
      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ error: "Invalid email or password" });
      }
      const valid = await verifyPassword(password, user.passwordHash);
      if (!valid) {
        return res.status(401).json({ error: "Invalid email or password" });
      }
      const token = signToken(user.id);
      res.json({
        token,
        user: { id: user.id, email: user.email, planTier: user.planTier },
      });
    } catch (err) {
      console.error("[login]", err);
      res.status(500).json({ error: "Failed to log in" });
    }
  });

  // GET /api/users/profile
  router.get("/users/profile", authMiddleware, async (req: AuthedRequest, res) => {
    try {
      const user = await storage.getUserById(req.userId!);
      if (!user) return res.status(404).json({ error: "User not found" });
      res.json({
        id: user.id,
        email: user.email,
        planTier: user.planTier,
        subscriptionInterval: user.subscriptionInterval,
        stripeCustomerId: user.stripeCustomerId,
      });
    } catch (err) {
      console.error("[profile]", err);
      res.status(500).json({ error: "Failed to fetch profile" });
    }
  });

  // GET /api/students
  router.get("/students", authMiddleware, async (req: AuthedRequest, res) => {
    try {
      const students = await storage.getStudentsByUserId(req.userId!);
      res.json(students);
    } catch (err) {
      console.error("[students]", err);
      res.status(500).json({ error: "Failed to fetch students" });
    }
  });

  // POST /api/students
  router.post("/students", authMiddleware, async (req: AuthedRequest, res) => {
    try {
      const parsed = studentSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Invalid input", details: parsed.error.flatten() });
      }
      const user = await storage.getUserById(req.userId!);
      if (!user) return res.status(404).json({ error: "User not found" });

      const limit = PLAN_LIMITS[user.planTier as PlanTier] || 1;
      const existing = await storage.getStudentsByUserId(req.userId!);
      if (existing.length >= limit) {
        return res.status(403).json({
          error: `Your ${user.planTier} plan allows up to ${limit} student${limit > 1 ? "s" : ""}. Upgrade to add more.`,
        });
      }

      const student = await storage.createStudent({
        userId: req.userId!,
        firstName: parsed.data.firstName,
        gradeLevel: parsed.data.gradeLevel,
        birthMonth: parsed.data.birthMonth ?? null,
      });
      res.status(201).json(student);
    } catch (err) {
      console.error("[create-student]", err);
      res.status(500).json({ error: "Failed to create student" });
    }
  });

  // GET /api/students/:id/growth
  router.get("/students/:id/growth", authMiddleware, async (req: AuthedRequest, res) => {
    try {
      const studentId = parseInt(req.params.id);
      const growth = await storage.getStudentGrowthData(studentId);
      res.json(growth);
    } catch (err) {
      console.error("[growth]", err);
      res.status(500).json({ error: "Failed to fetch growth data" });
    }
  });

  // POST /api/students/:id/curriculum/generate
  router.post("/students/:id/curriculum/generate", authMiddleware, async (req: AuthedRequest, res) => {
    try {
      const studentId = parseInt(req.params.id);
      const student = await storage.getStudentById(studentId);
      if (!student) return res.status(404).json({ error: "Student not found" });

      const { subject, quarter, status } = req.body;
      const result = await generateCurriculum(student.gradeLevel, subject, quarter, status);
      const plan = await storage.createCurriculumPlan({
        studentId,
        subject,
        quarter,
        topics: result.topics,
        content: result.content,
      });
      res.status(201).json(plan);
    } catch (err) {
      console.error("[curriculum-gen]", err);
      res.status(500).json({ error: "Failed to generate curriculum" });
    }
  });

  // POST /api/lesson-plan/generate
  router.post("/lesson-plan/generate", authMiddleware, async (req: AuthedRequest, res) => {
    try {
      const { gradeLevel, subject, topic } = req.body;
      const content = await generateLessonPlan(gradeLevel, subject, topic);
      res.json({ content });
    } catch (err) {
      console.error("[lesson-plan]", err);
      res.status(500).json({ error: "Failed to generate lesson plan" });
    }
  });

  // GET /api/email-preferences
  router.get("/email-preferences", authMiddleware, async (req: AuthedRequest, res) => {
    try {
      const prefs = await storage.getEmailPreferences(req.userId!);
      res.json(
        prefs || {
          weeklyDigest: true,
          quarterEndNudge: true,
          weeklyPractice: true,
        },
      );
    } catch (err) {
      console.error("[email-prefs]", err);
      res.status(500).json({ error: "Failed to fetch email preferences" });
    }
  });

  // PUT /api/email-preferences
  router.put("/email-preferences", authMiddleware, async (req: AuthedRequest, res) => {
    try {
      const { weeklyDigest, quarterEndNudge, weeklyPractice } = req.body;
      await storage.setEmailPreferences(req.userId!, { weeklyDigest, quarterEndNudge, weeklyPractice });
      res.json({ success: true });
    } catch (err) {
      console.error("[email-prefs-update]", err);
      res.status(500).json({ error: "Failed to update email preferences" });
    }
  });

  return router;
}
