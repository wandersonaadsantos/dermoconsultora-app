import { describe, expect, test } from "vitest";
import type { ProductRow } from "../data/types";
import { buildAttendResult } from "./attendFlow";

function makeProduct(overrides: Partial<ProductRow>): ProductRow {
  return {
    URL_produto: "https://example.com/p",
    Produto: "Produto",
    Marca: "Marca",
    ...overrides
  };
}

describe("attend/buildAttendResult", () => {
  test("sinal de alerta bloqueia indicações", () => {
    const all: ProductRow[] = [makeProduct({ need_tags: "oleosidade" })];
    const result = buildAttendResult(all, {
      need: "Oleosidade",
      needKind: "query",
      area: "Rosto",
      preference: "uso-simples",
      hasAlert: true
    });
    expect(result.mode).toBe("alert");
    expect(result.items.length).toBe(0);
  });

  test("recomenda no máximo 8 produtos", () => {
    const all: ProductRow[] = Array.from({ length: 30 }).map((_, i) =>
      makeProduct({
        URL_produto: `https://example.com/p/${i}`,
        Produto: `Produto ${i}`,
        need_tags: "oleosidade",
        routine_step: "limpeza"
      })
    );

    const result = buildAttendResult(all, {
      need: "Oleosidade",
      needKind: "query",
      area: "Rosto",
      preference: "uso-simples",
      hasAlert: false
    });

    expect(result.mode).toBe("recommendations");
    expect(result.items.length).toBeLessThanOrEqual(8);
  });

  test("em Rosto filtra para etapas da rotina facial", () => {
    const all: ProductRow[] = [
      makeProduct({ URL_produto: "https://example.com/a", need_tags: "oleosidade", routine_step: "limpeza" }),
      makeProduct({ URL_produto: "https://example.com/b", need_tags: "oleosidade", routine_step: "outros" }),
      makeProduct({ URL_produto: "https://example.com/c", need_tags: "oleosidade", routine_step: "tratamento_cosmetico" })
    ];

    const result = buildAttendResult(all, {
      need: "oleosidade",
      needKind: "tag",
      area: "Rosto",
      preference: "sem-preferencia",
      hasAlert: false
    });

    expect(result.mode).toBe("recommendations");
    expect(result.items.map((p) => p.URL_produto)).toEqual(["https://example.com/a", "https://example.com/c"]);
  });
});
