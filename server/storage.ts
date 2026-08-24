// server/storage.ts — Data access layer wrapping Drizzle ORM queries.
// Every query the app needs goes through here so the route handlers stay thin.
import { getDb } from "./db";
import { eq, and, desc, gte } from "drizzle-orm";
import {
  users,
  students,
  diagnostics,
  curriculumPlans,
  practiceSessions,
  emailPreferences,
  growthRecords,
  type User,
  type Student,
  type Diagnostic,
  type CurriculumPlan,
  type PracticeSession,
  type EmailPreference,
  type GrowthRecord,
} from "@shared/schema";

export class Storage {
  private db = getDb();

  // --- Users ---
  async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.email, email)).limit(1);
    return result[0];
  }

  async getUserById(id: number): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async createUser(data: { email: string; passwordHash: string; firstName?: string }): Promise<User> {
    const [user] = await this.db
      .insert(users)
      .values({
        email: data.email,
        passwordHash: data.passwordHash,
        planTier: "free",
        subscriptionInterval: "monthly",
      })
      .returning();
    return user;
  }

  async updateUserStripeInfo(userId: number, customerId: string, planTier: string, interval: string): Promise<User> {
    const [updated] = await this.db
      .update(users)
      .set({ stripeCustomerId: customerId, planTier, subscriptionInterval: interval })
      .where(eq(users.id, userId))
      .returning();
    return updated;
  }

  async getUserByStripeCustomerId(customerId: string): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.stripeCustomerId, customerId)).limit(1);
    return result[0];
  }

  // --- Students ---
  async getStudentsByUserId(userId: number): Promise<Student[]> {
    return this.db.select().from(students).where(eq(students.userId, userId));
  }

  async getStudentById(id: number): Promise<Student | undefined> {
    const result = await this.db.select().from(students).where(eq(students.id, id)).limit(1);
    return result[0];
  }

  async createStudent(data: Omit<Student, "id" | "createdAt"> & { birthMonth?: number | null }): Promise<Student> {
    const [student] = await this.db.insert(students).values({
      ...data,
      birthMonth: data.birthMonth ?? null,
    }).returning();
    return student;
  }

  // --- Diagnostics ---
  async getDiagnosticsByStudentId(studentId: number): Promise<Diagnostic[]> {
    return this.db.select().from(diagnostics).where(eq(diagnostics.studentId, studentId));
  }

  async createDiagnostic(data: Omit<Diagnostic, "id" | "createdAt">): Promise<Diagnostic> {
    const [d] = await this.db.insert(diagnostics).values(data).returning();
    return d;
  }

  // --- Curriculum Plans ---
  async getCurriculumPlansByStudentId(studentId: number): Promise<CurriculumPlan[]> {
    return this.db
      .select()
      .from(curriculumPlans)
      .where(eq(curriculumPlans.studentId, studentId))
      .orderBy(desc(curriculumPlans.createdAt));
  }

  async createCurriculumPlan(data: Omit<CurriculumPlan, "id" | "createdAt">): Promise<CurriculumPlan> {
    const [p] = await this.db.insert(curriculumPlans).values(data).returning();
    return p;
  }

  // --- Practice Sessions ---
  async getPracticeSessionByCurriculumPlanId(planId: number): Promise<PracticeSession[]> {
    return this.db.select().from(practiceSessions).where(eq(practiceSessions.curriculumPlanId, planId));
  }

  async getPracticeSessionsByStudentId(studentId: number): Promise<PracticeSession[]> {
    return this.db.select().from(practiceSessions).where(eq(practiceSessions.studentId, studentId));
  }

  async getPracticeSessionsThisWeek(studentId: number, weekStart: Date): Promise<PracticeSession[]> {
    return this.db
      .select()
      .from(practiceSessions)
      .where(and(eq(practiceSessions.studentId, studentId), gte(practiceSessions.createdAt, weekStart)));
  }

  async createPracticeSession(data: Omit<PracticeSession, "id" | "createdAt">): Promise<PracticeSession> {
    const [ps] = await this.db.insert(practiceSessions).values(data).returning();
    return ps;
  }

  // --- Email Preferences ---
  async getEmailPreferences(userId: number): Promise<EmailPreference | undefined> {
    const result = await this.db.select().from(emailPreferences).where(eq(emailPreferences.userId, userId)).limit(1);
    return result[0];
  }

  async setEmailPreferences(userId: number, prefs: Partial<Omit<EmailPreference, "id" | "userId">>): Promise<void> {
    const existing = await this.getEmailPreferences(userId);
    if (existing) {
      await this.db
        .update(emailPreferences)
        .set(prefs)
        .where(eq(emailPreferences.id, existing.id));
    } else {
      await this.db.insert(emailPreferences).values({ userId, ...prefs });
    }
  }

  // --- Growth Data ---
  async getStudentGrowthData(studentId: number): Promise<GrowthRecord[]> {
    return this.db
      .select()
      .from(growthRecords)
      .where(eq(growthRecords.studentId, studentId))
      .orderBy(desc(growthRecords.createdAt));
  }

  async createGrowthRecord(data: Omit<GrowthRecord, "id" | "createdAt">): Promise<GrowthRecord> {
    const [g] = await this.db.insert(growthRecords).values(data).returning();
    return g;
  }

  // --- Account ---
  async deleteUser(userId: number): Promise<void> {
    const userStudents = await this.getStudentsByUserId(userId);
    for (const student of userStudents) {
      await this.db.delete(diagnostics).where(eq(diagnostics.studentId, student.id));
      await this.db.delete(curriculumPlans).where(eq(curriculumPlans.studentId, student.id));
      await this.db.delete(practiceSessions).where(eq(practiceSessions.studentId, student.id));
      await this.db.delete(growthRecords).where(eq(growthRecords.studentId, student.id));
    }
    await this.db.delete(students).where(eq(students.userId, userId));
    await this.db.delete(emailPreferences).where(eq(emailPreferences.userId, userId));
    await this.db.delete(users).where(eq(users.id, userId));
  }

  async exportUserData(userId: number): Promise<Record<string, unknown>> {
    const user = await this.getUserById(userId);
    const userStudents = await this.getStudentsByUserId(userId);
    const studentData: Record<string, unknown>[] = [];
    for (const student of userStudents) {
      studentData.push({
        ...student,
        diagnostics: await this.getDiagnosticsByStudentId(student.id),
        curriculumPlans: await this.getCurriculumPlansByStudentId(student.id),
        practiceSessions: await this.getPracticeSessionsByStudentId(student.id),
        growthRecords: await this.getStudentGrowthData(student.id),
      });
    }
    return { user: { email: user?.email, planTier: user?.planTier }, students: studentData };
  }
}

export const storage = new Storage();
