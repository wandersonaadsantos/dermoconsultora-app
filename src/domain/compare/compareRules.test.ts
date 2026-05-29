import { expect, test } from "vitest";
import { getCompareStatus } from "./compareRules";

test("bloqueia comparação direta com grupos genéricos", () => {
  const a: any = { comparison_group: "tratamento_cosmetico_outros", is_substitute_group: true };
  const b: any = { comparison_group: "tratamento_cosmetico_outros", is_substitute_group: true };
  const s = getCompareStatus([a, b]);
  expect(s.canCompareDirectly).toBe(false);
  expect(s.warnings.some((w) => w.includes("grupo genérico"))).toBe(true);
});

test("permite comparação direta quando grupo é específico e ambos são substitutos", () => {
  const a: any = { comparison_group: "gel_limpeza_facial", is_substitute_group: true };
  const b: any = { comparison_group: "gel_limpeza_facial", is_substitute_group: "true" };
  const s = getCompareStatus([a, b]);
  expect(s.canCompareDirectly).toBe(true);
});

test("grupos diferentes geram aviso", () => {
  const a: any = { comparison_group: "gel_limpeza_facial", is_substitute_group: true };
  const b: any = { comparison_group: "hidratante_facial", is_substitute_group: true };
  const s = getCompareStatus([a, b]);
  expect(s.canCompareDirectly).toBe(false);
  expect(s.warnings.some((w) => w.includes("grupos diferentes"))).toBe(true);
});

