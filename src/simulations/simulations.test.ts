import { describe, expect, test } from "vitest";
import { simulations } from "./simulations";

describe("simulations", () => {
  test("inclui os perfis de cliente difíceis", () => {
    const ids = new Set(simulations.map((s) => s.id));
    expect(ids.has("cliente-hostil")).toBe(true);
    expect(ids.has("internet-tiktok")).toBe(true);
    expect(ids.has("cliente-insistente")).toBe(true);
  });

  test("todo cenário tem estrutura completa", () => {
    for (const s of simulations) {
      expect(s.id.trim().length).toBeGreaterThan(0);
      expect(s.title.trim().length).toBeGreaterThan(0);
      expect(s.summary.trim().length).toBeGreaterThan(0);
      expect(s.context.trim().length).toBeGreaterThan(0);
      expect(s.questionsToAsk.length).toBeGreaterThan(0);
      expect(s.safeResponse.trim().length).toBeGreaterThan(0);
      expect(s.whatNotToSay.length).toBeGreaterThan(0);
      expect(s.whenToRefer.trim().length).toBeGreaterThan(0);
      expect(s.closing.trim().length).toBeGreaterThan(0);
    }
  });

  test("ids são únicos", () => {
    const ids = simulations.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
