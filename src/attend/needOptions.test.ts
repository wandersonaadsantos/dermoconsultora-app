import { describe, expect, test } from "vitest";
import { buildMoreNeeds, CURATED_NEEDS } from "./needOptions";

describe("attend/needOptions", () => {
  test("lista curada é curta e estável", () => {
    expect(CURATED_NEEDS.length).toBeGreaterThanOrEqual(8);
    expect(CURATED_NEEDS.includes("Oleosidade")).toBe(true);
    expect(CURATED_NEEDS.includes("Proteção solar")).toBe(true);
  });

  test("buildMoreNeeds remove itens curados e ordena", () => {
    const all = ["oleosidade", "cravos", "barreira cutânea", "proteção solar"];
    const more = buildMoreNeeds(all);
    expect(more.some((o) => o.label === "Oleosidade")).toBe(false);
    expect(more.some((o) => o.label === "Proteção solar")).toBe(false);
    expect(more.map((o) => o.label)).toEqual(["Barreira cutânea", "Cravos"]);
  });

  test("buildMoreNeeds preserva valor bruto para filtro", () => {
    const all = ["queda_intensa"];
    const more = buildMoreNeeds(all);
    expect(more).toEqual([{ value: "queda_intensa", label: "Queda intensa" }]);
  });
});
