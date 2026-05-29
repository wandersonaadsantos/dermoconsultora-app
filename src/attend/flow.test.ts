import { describe, expect, test } from "vitest";
import { createInitialAttendState, nextAttendStep, previousAttendStep } from "./flow";

describe("attend/flow", () => {
  test("inicia na triagem com estado vazio", () => {
    const s = createInitialAttendState();
    expect(s.step).toBe("triage");
    expect(s.hasAlert).toBe(false);
    expect(s.selectedNeedTags).toEqual([]);
    expect(s.customNeedText).toBe("");
  });

  test("avança e volta entre etapas", () => {
    const s1 = createInitialAttendState();
    const s2 = nextAttendStep(s1);
    expect(s2.step).toBe("needs");
    const s3 = nextAttendStep(s2);
    expect(s3.step).toBe("recommendations");
    const s4 = previousAttendStep(s3);
    expect(s4.step).toBe("needs");
  });
});

