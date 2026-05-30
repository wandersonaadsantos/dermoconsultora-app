import { describe, expect, test } from "vitest";
import { courseModules } from "../course/courseModules";
import {
  STAGES,
  TRILHA_ORDER,
  computeXp,
  computeLevel,
  computeStageProgress,
  computeMilestones,
  nextModuleId,
  computeStreak
} from "./gamification";

describe("gamification / stages", () => {
  test("as etapas cobrem todos os módulos, sem repetição e sem ids inválidos", () => {
    const validIds = new Set(courseModules.map((m) => m.id));
    const seen = new Set<string>();
    for (const id of TRILHA_ORDER) {
      expect(validIds.has(id)).toBe(true);
      expect(seen.has(id)).toBe(false);
      seen.add(id);
    }
    expect(seen.size).toBe(courseModules.length);
  });

  test("toda etapa tem título, ícone e ao menos um módulo", () => {
    for (const s of STAGES) {
      expect(s.title.trim().length).toBeGreaterThan(0);
      expect(s.icon.trim().length).toBeGreaterThan(0);
      expect(s.moduleIds.length).toBeGreaterThan(0);
    }
  });
});

describe("gamification / nível e xp", () => {
  test("xp acompanha módulos lidos", () => {
    expect(computeXp(0)).toBe(0);
    expect(computeXp(3)).toBe(30);
  });

  test("nível evolui por faixas", () => {
    expect(computeLevel(0).current.key).toBe("iniciante");
    expect(computeLevel(5).current.key).toBe("aprendiz");
    expect(computeLevel(15).current.key).toBe("consultora");
    expect(computeLevel(28).current.key).toBe("especialista");
    expect(computeLevel(28).next).toBeNull();
    expect(computeLevel(0).modulesToNext).toBe(5);
  });
});

describe("gamification / etapas e marcos", () => {
  test("progresso de etapa e marco quando 100%", () => {
    const stage = STAGES[0];
    const partial = new Set([stage.moduleIds[0]]);
    const p = computeStageProgress(stage, partial);
    expect(p.read).toBe(1);
    expect(p.complete).toBe(false);

    const full = new Set(stage.moduleIds);
    expect(computeStageProgress(stage, full).complete).toBe(true);
    expect(computeMilestones(full).map((s) => s.id)).toContain(stage.id);
  });

  test("nextModuleId retorna o primeiro não lido na ordem da trilha", () => {
    expect(nextModuleId(new Set())).toBe(TRILHA_ORDER[0]);
    const readFirst = new Set([TRILHA_ORDER[0]]);
    expect(nextModuleId(readFirst)).toBe(TRILHA_ORDER[1]);
    expect(nextModuleId(new Set(TRILHA_ORDER))).toBeNull();
  });
});

describe("gamification / streak", () => {
  test("conta dias consecutivos terminando hoje", () => {
    expect(computeStreak(["2026-05-28", "2026-05-29", "2026-05-30"], "2026-05-30")).toBe(3);
  });

  test("conta a partir de ontem se não estudou hoje ainda", () => {
    expect(computeStreak(["2026-05-28", "2026-05-29"], "2026-05-30")).toBe(2);
  });

  test("zera se houve um buraco", () => {
    expect(computeStreak(["2026-05-20", "2026-05-21"], "2026-05-30")).toBe(0);
    expect(computeStreak([], "2026-05-30")).toBe(0);
  });
});
