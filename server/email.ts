// server/email.ts — Email sending via Resend
// All email functions are gated behind isEmailConfigured() — safe to call even if Resend isn't set up.
import { Resend } from "resend";
import { storage } from "./storage.js";
import type { Student, CurriculumPlan, PracticeSession } from "@shared/schema";

const FROM_EMAIL = process.env.FROM_EMAIL || "ScholarGuide <noreply@scholarguide.app>";
const APP_URL = process.env.APP_URL || "http://localhost:5173";

export function isEmailConfigured(): boolean {
  return !!process.env.RESEND_API_KEY;
}

function getResend(): Resend {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not set");
  }
  return new Resend(apiKey);
}

async function sendEmail(to: string, subject: string, html: string): Promise<boolean> {
  if (!isEmailConfigured()) {
    console.log(`[email] Not configured — would send to ${to}: ${subject}`);
    return false;
  }
  try {
    const resend = getResend();
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject,
      html,
    });
    if (error) {
      console.error("[email] Resend error:", error);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[email] Send failed:", err);
    return false;
  }
}

/**
 * Quarter-end nudge email — sent when a new quarter is starting,
 * prompting the parent to run a new diagnostic.
 */
export async function sendQuarterEndNudge(
  userEmail: string,
  studentName: string,
  studentId: number,
  quarter: number,
): Promise<boolean> {
  const subject = `Time for ${studentName}'s Q${quarter} check-in`;
  const html = `
    <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto;">
      <h2>Quarter ${quarter} is here! 📚</h2>
      <p>It's time for ${studentName}'s quarterly diagnostic. This 15-minute check-in shows exactly where they stand and generates a fresh curriculum plan for the new quarter.</p>
      <p><a href="${APP_URL}/students/${studentId}/diagnostic" style="display:inline-block;background:#4f46e5;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;">Start Q${quarter} Diagnostic</a></p>
      <p style="color:#6b7280;font-size:14px;">You're receiving this because quarterly check-ins are part of your ScholarGuide plan. <a href="${APP_URL}/settings">Manage email preferences</a></p>
    </div>
  `;
  return sendEmail(userEmail, subject, html);
}

/**
 * Weekly practice reminder — sent mid-week to remind parents to do a practice session.
 */
export async function sendWeeklyPracticeReminder(
  userEmail: string,
  studentName: string,
  studentId: number,
): Promise<boolean> {
  const subject = `${studentName}'s weekly practice is ready`;
  const html = `
    <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto;">
      <h2>Practice time! ✏️</h2>
      <p>A new practice session is ready for ${studentName}. Just 10-15 minutes a few times this week keeps them on track.</p>
      <p><a href="${APP_URL}/students/${studentId}/practice" style="display:inline-block;background:#4f46e5;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;">Start Practice</a></p>
      <p style="color:#6b7280;font-size:14px;">You're receiving this because weekly practice reminders are on. <a href="${APP_URL}/settings">Manage email preferences</a></p>
    </div>
  `;
  return sendEmail(userEmail, subject, html);
}

/**
 * WEEKLY PARENT DIGEST — Priority 2a
 * Summarizes what a student worked on this week and what's coming next.
 * A retention touchpoint between the quarterly assessment cadence.
 *
 * Content sources:
 *   - Curriculum plans: storage.getCurriculumPlansByStudentId (current quarter topics)
 *   - Practice sessions this week: storage.getPracticeSessionsThisWeek
 */
export async function sendWeeklyDigest(
  userEmail: string,
  student: Student,
  curriculumPlans: CurriculumPlan[],
  practiceSessions: PracticeSession[],
): Promise<boolean> {
  const subject = `${student.firstName}'s week on ScholarGuide`;

  // Build practice summary
  const completedCount = practiceSessions.filter((p) => p.completed).length;
  const totalCount = practiceSessions.length;

  // Build upcoming topics from latest curriculum plan
  const latestPlan = curriculumPlans[0];
  const upcomingTopics = latestPlan?.topics?.slice(0, 3).map((t) => `<li>${t}</li>`).join("") || "";

  const practiceSection =
    totalCount > 0
      ? `<p>This week ${student.firstName} completed <strong>${completedCount} of ${totalCount}</strong> practice sessions.</p>`
      : `<p>No practice sessions this week — that's okay! Even 10 minutes makes a difference. <a href="${APP_URL}/students/${student.id}/practice">Start one now →</a></p>`;

  const upcomingSection =
    upcomingTopics.length > 0
      ? `<h3>What's next</h3><ul>${upcomingTopics}</ul>`
      : "";

  const html = `
    <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto;">
      <h2>${student.firstName}'s weekly digest 📊</h2>
      ${practiceSection}
      ${upcomingSection}
      <p><a href="${APP_URL}/students/${student.id}" style="display:inline-block;background:#4f46e5;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;">View Full Dashboard</a></p>
      <p style="color:#6b7280;font-size:14px;">You're receiving this because weekly digests are on. <a href="${APP_URL}/settings">Manage email preferences</a></p>
    </div>
  `;

  return sendEmail(userEmail, subject, html);
}

/**
 * Process all weekly digests for all users with the preference enabled.
 * Called by the cron endpoint.
 */
export async function processWeeklyDigests(): Promise<{ sent: number; skipped: number; errors: number }> {
  const { getDb } = await import("./db.js");
  const db = getDb();
  const { users, students, emailPreferences } = await import("@shared/schema");
  const { eq, and } = await import("drizzle-orm");

  const result = { sent: 0, skipped: 0, errors: 0 };

  if (!isEmailConfigured()) {
    console.log("[email] Resend not configured — skipping weekly digests");
    return result;
  }

  // Get all users with weekly digest enabled
  const usersWithPrefs = await db
    .select({
      user: users,
      prefs: emailPreferences,
    })
    .from(users)
    .innerJoin(emailPreferences, eq(users.id, emailPreferences.userId))
    .where(eq(emailPreferences.weeklyDigest, true));

  const weekStart = new Date();
  weekStart.setDate(weekStart.getDate() - 7);

  for (const { user, prefs } of usersWithPrefs) {
    try {
      if (!prefs?.weeklyDigest) {
        result.skipped++;
        continue;
      }

      const userStudents = await storage.getStudentsByUserId(user.id);
      for (const student of userStudents) {
        const plans = await storage.getCurriculumPlansByStudentId(student.id);
        const sessions = await storage.getPracticeSessionsThisWeek(student.id, weekStart);
        await sendWeeklyDigest(user.email, student, plans, sessions);
        result.sent++;
      }
    } catch (err) {
      console.error(`[email] Digest failed for user ${user.id}:`, err);
      result.errors++;
    }
  }

  return result;
}
