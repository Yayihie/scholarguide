// tests/quickCheckPassages.test.ts — Tests for the static quick-check passages
import { describe, it, expect } from "vitest";
import { QUICK_CHECK_PASSAGES } from "../shared/quickCheckPassages";

describe("QUICK_CHECK_PASSAGES", () => {
  it("has passages for grades 1-8", () => {
    for (let g = 1; g <= 8; g++) {
      const passage = QUICK_CHECK_PASSAGES.find((p) => p.grade === g);
      expect(passage, `Missing passage for grade ${g}`).toBeDefined();
    }
  });

  it("has accurate word counts (±2)", () => {
    for (const passage of QUICK_CHECK_PASSAGES) {
      const actualWords = passage.text.split(/\s+/).length;
      expect(Math.abs(actualWords - passage.wordCount)).toBeLessThanOrEqual(2);
    }
  });

  it("has unique ids", () => {
    const ids = QUICK_CHECK_PASSAGES.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
