// tests/readingFluencyBenchmarks.test.ts — Tests for the shared fluency math
import { describe, it, expect } from "vitest";
import {
  computeFluencyMetrics,
  getBenchmarkForGrade,
  statusLabel,
  FLUENCY_BENCHMARKS,
} from "../shared/readingFluencyBenchmarks";

describe("FLUENCY_BENCHMARKS", () => {
  it("has benchmarks for grades 1-8", () => {
    expect(FLUENCY_BENCHMARKS.length).toBe(8);
    for (let i = 1; i <= 8; i++) {
      expect(getBenchmarkForGrade(i)).toBeDefined();
    }
  });
});

describe("computeFluencyMetrics", () => {
  it("computes WPM correctly for a 3rd grader reading at benchmark", () => {
    // 86 words correct, read in 60 seconds (1 minute) → 86 WPM
    const result = computeFluencyMetrics(86, 0, 60, 3);
    expect(result.wpm).toBe(86);
    expect(result.accuracy).toBe(100);
    expect(result.status).toBe("on_track");
  });

  it("detects below-grade-level reading", () => {
    // 50 words correct, 60 seconds, grade 3 (target 86)
    // 50/86 = 58% → below 85% threshold → "below"
    const result = computeFluencyMetrics(50, 0, 60, 3);
    expect(result.wpm).toBe(50);
    expect(result.status).toBe("below");
  });

  it("detects above-grade-level reading", () => {
    // 100 words correct, 60 seconds, grade 3 (target 86)
    // 100/86 = 116% → above 115% threshold → "above"
    const result = computeFluencyMetrics(100, 0, 60, 3);
    expect(result.wpm).toBe(100);
    expect(result.status).toBe("above");
  });

  it("accounts for words missed in accuracy", () => {
    // 50 words total, 5 missed → 45 correct, 90% accuracy
    const result = computeFluencyMetrics(50, 5, 60, 3);
    expect(result.wpm).toBe(45);
    expect(result.accuracy).toBe(90);
  });

  it("handles zero time gracefully", () => {
    const result = computeFluencyMetrics(50, 0, 0, 3);
    expect(result.wpm).toBe(0);
  });

  it("handles unknown grade gracefully", () => {
    const result = computeFluencyMetrics(50, 0, 60, 12);
    expect(result.wpm).toBe(50);
    expect(result.status).toBe("on_track");
    expect(result.gradeBenchmark).toBe(0);
  });
});

describe("statusLabel", () => {
  it("returns correct labels", () => {
    expect(statusLabel("below")).toBe("Below Grade Level");
    expect(statusLabel("on_track")).toBe("On Track");
    expect(statusLabel("above")).toBe("Above Grade Level");
  });
});
