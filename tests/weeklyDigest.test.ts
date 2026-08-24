// tests/weeklyDigest.test.ts — Tests for the weekly digest email logic
import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock dependencies before importing
vi.mock("../server/db", () => ({
  getDb: () => ({
    select: () => ({ from: () => ({ innerJoin: () => ({ where: () => [] }) }) }),
  }),
}));

vi.mock("../server/storage", () => ({
  storage: {
    getStudentsByUserId: vi.fn().mockResolvedValue([]),
    getCurriculumPlansByStudentId: vi.fn().mockResolvedValue([]),
    getPracticeSessionsThisWeek: vi.fn().mockResolvedValue([]),
  },
}));

vi.mock("resend", () => ({
  Resend: vi.fn().mockImplementation(() => ({
    emails: { send: vi.fn().mockResolvedValue({ error: null }) },
  })),
}));

// Import after mocks
import { isEmailConfigured, processWeeklyDigests } from "../server/email";

describe("email module", () => {
  beforeEach(() => {
    // Reset env before each test
    delete process.env.RESEND_API_KEY;
  });

  it("isEmailConfigured returns false when no API key", () => {
    expect(isEmailConfigured()).toBe(false);
  });

  it("processWeeklyDigests returns zero counts when email not configured", async () => {
    const result = await processWeeklyDigests();
    expect(result.sent).toBe(0);
    expect(result.skipped).toBe(0);
    expect(result.errors).toBe(0);
  });
});
