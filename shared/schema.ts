// shared/schema.ts — Drizzle schema + Zod validation schemas
import {
  pgTable,
  text,
  timestamp,
  integer,
  serial,
  pgEnum,
  boolean,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

// --- Enums ---
export const planTierEnum = pgEnum("plan_tier", ["free", "basic", "pro"]);
export type PlanTier = "free" | "basic" | "pro";

// --- Users ---
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  stripeCustomerId: text("stripe_customer_id"),
  planTier: text("plan_tier").notNull().default("free"),
  subscriptionInterval: text("subscription_interval").default("monthly"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

// --- Students ---
export const students = pgTable("students", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  firstName: text("first_name").notNull(),
  gradeLevel: integer("grade_level").notNull(),
  birthMonth: integer("birth_month"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertStudentSchema = createInsertSchema(students);
export type Student = typeof students.$inferSelect;

// --- Diagnostics ---
export const diagnostics = pgTable("diagnostics", {
  id: serial("id").primaryKey(),
  studentId: integer("student_id").notNull().references(() => students.id),
  subject: text("subject").notNull(),
  gradeLevel: integer("grade_level").notNull(),
  score: integer("score").notNull(),
  status: text("status").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Diagnostic = typeof diagnostics.$inferSelect;

// --- Curriculum Plans ---
export const curriculumPlans = pgTable("curriculum_plans", {
  id: serial("id").primaryKey(),
  studentId: integer("student_id").notNull().references(() => students.id),
  subject: text("subject").notNull(),
  quarter: integer("quarter").notNull(),
  topics: text("topics").array(),
  content: text("content"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type CurriculumPlan = typeof curriculumPlans.$inferSelect;

// --- Practice Sessions ---
export const practiceSessions = pgTable("practice_sessions", {
  id: serial("id").primaryKey(),
  curriculumPlanId: integer("curriculum_plan_id").notNull().references(() => curriculumPlans.id),
  studentId: integer("student_id").notNull().references(() => students.id),
  completed: boolean("completed").default(false),
  score: integer("score"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type PracticeSession = typeof practiceSessions.$inferSelect;

// --- Email Preferences ---
export const emailPreferences = pgTable("email_preferences", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  weeklyDigest: boolean("weekly_digest").default(true),
  quarterEndNudge: boolean("quarter_end_nudge").default(true),
  weeklyPractice: boolean("weekly_practice").default(true),
});

export type EmailPreference = typeof emailPreferences.$inferSelect;

// --- Growth Data ---
export const growthRecords = pgTable("growth_records", {
  id: serial("id").primaryKey(),
  studentId: integer("student_id").notNull().references(() => students.id),
  subject: text("subject").notNull(),
  quarter: integer("quarter").notNull(),
  beforeStatus: text("before_status").notNull(),
  afterStatus: text("after_status").notNull(),
  trendData: text("trend_data"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type GrowthRecord = typeof growthRecords.$inferSelect;

// --- Zod schemas for API ---
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  firstName: z.string().min(1).optional(),
});

export const studentSchema = z.object({
  firstName: z.string().min(1),
  gradeLevel: z.number().int().min(1).max(8),
  birthMonth: z.number().int().min(1).max(12).optional(),
});

export const PLAN_LIMITS: Record<PlanTier, number> = {
  free: 1,
  basic: 3,
  pro: 10,
};

export const SUBJECTS = ["Reading", "Math", "Writing", "Science", "Social Studies"] as const;
export type Subject = (typeof SUBJECTS)[number];

export const ART_FRAMEWORKS = ["Visual Art", "Music", "Dance", "Theater"] as const;
export const LANGUAGE_FRAMEWORKS = ["Spanish", "French", "Mandarin"] as const;
