import { describe, expect, test } from "vitest";
import { createInitialAttendState } from "./flow";
import { filterProductsByAnyNeedTag, getRecommendationGate } from "./recommendations";

describe("attend/recommendations", () => {
  test("bloqueia recomendações quando há sinal de alerta", () => {
    const s = { ...createInitialAttendState(), hasAlert: true, step: "recommendations" as const };
    const gate = getRecommendationGate(s);
    expect(gate.blocked).toBe(true);
  });

  test("filtra por qualquer necessidade selecionada", () => {
    const rows = [
      { URL_produto: "1", need_tags: "acne|oleosidade" },
      { URL_produto: "2", need_tags: "mancha" },
      { URL_produto: "3", need_tags: "" }
    ] as any[];

    const filtered = filterProductsByAnyNeedTag(rows, ["oleosidade", "sensibilidade"]);
    expect(filtered.map((r) => r.URL_produto)).toEqual(["1"]);
  });
});

