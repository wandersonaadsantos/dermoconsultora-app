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
    expect(result.items.length).toBeLessThanOrEqual(6);
  });

  test("Maquiagem básica usa routine_step=maquiagem independente da área selecionada", () => {
    const all: ProductRow[] = [
      makeProduct({
        URL_produto: "https://example.com/m",
        Produto: "Base facial",
        routine_step: "maquiagem"
      })
    ];

    const result = buildAttendResult(all, {
      need: "Maquiagem básica",
      needKind: "query",
      area: "Corpo", // área incorreta — deve encontrar mesmo assim
      preference: "sem-preferencia",
      hasAlert: false
    });

    expect(result.mode).toBe("recommendations");
    expect(result.items.length).toBe(1);
  });

  test("Perfume/presente usa routine_step=perfumaria independente da área selecionada", () => {
    const all: ProductRow[] = [
      makeProduct({
        URL_produto: "https://example.com/p",
        Produto: "Colônia X",
        routine_step: "perfumaria"
      })
    ];

    const result = buildAttendResult(all, {
      need: "Perfume/presente",
      needKind: "query",
      area: "Rosto", // área incorreta — deve encontrar mesmo assim
      preference: "sem-preferencia",
      hasAlert: false
    });

    expect(result.mode).toBe("recommendations");
    expect(result.items.length).toBe(1);
  });

  test("fallback sem área para busca textual quando retorna vazio com área", () => {
    const all: ProductRow[] = [
      makeProduct({
        URL_produto: "https://example.com/h",
        Produto: "Hidratante corporal",
        need_tags: "hidratação",
        routine_step: "corpo"
      })
    ];

    // Busca por "hidratação" com área "Cabelo" não encontra → fallback sem área
    const result = buildAttendResult(all, {
      need: "Hidratação",
      needKind: "query",
      area: "Cabelo",
      preference: "sem-preferencia",
      hasAlert: false
    });

    expect(result.mode).toBe("recommendations");
    expect(result.items.length).toBe(1);
  });

  test("filtro de relevância exclui kits, infantis e bundles com repelente", () => {
    const all: ProductRow[] = [
      makeProduct({
        URL_produto: "https://example.com/ok",
        Produto: "Protetor Facial FPS 50",
        need_tags: "proteção solar",
        routine_step: "protecao_solar"
      }),
      makeProduct({
        URL_produto: "https://example.com/kit",
        Produto: "Kit Protetor Solar Kids Bob Esponja + Repelente Infantil",
        need_tags: "proteção solar",
        routine_step: "protecao_solar"
      })
    ];

    const result = buildAttendResult(all, {
      need: "proteção solar",
      needKind: "tag",
      area: "Rosto",
      preference: "sem-preferencia",
      hasAlert: false
    });

    const urls = (result.items as ProductRow[]).map((p) => p.URL_produto);
    expect(urls).toContain("https://example.com/ok");
    expect(urls).not.toContain("https://example.com/kit");
  });

  test("em Rosto descarta regiões não-faciais (mãos/corpo/cabelo), mas mantém 'facial e corporal'", () => {
    const all: ProductRow[] = [
      makeProduct({
        URL_produto: "https://example.com/face",
        Produto: "Protetor Solar Facial FPS 50",
        need_tags: "proteção solar",
        routine_step: "protecao_solar"
      }),
      makeProduct({
        URL_produto: "https://example.com/maos",
        Produto: "Creme Hidratante para Mãos com Proteção Solar",
        need_tags: "proteção solar",
        routine_step: "protecao_solar"
      }),
      makeProduct({
        URL_produto: "https://example.com/corporal",
        Produto: "Proteção Solar Corporal FPS 60",
        need_tags: "proteção solar",
        routine_step: "protecao_solar"
      }),
      makeProduct({
        URL_produto: "https://example.com/capilar",
        Produto: "Protetor Solar Capilar 120ml",
        need_tags: "proteção solar",
        routine_step: "protecao_solar"
      }),
      makeProduct({
        URL_produto: "https://example.com/ambos",
        Produto: "Protetor Solar Facial e Corporal FPS 50",
        need_tags: "proteção solar",
        routine_step: "protecao_solar"
      })
    ];

    const result = buildAttendResult(all, {
      need: "proteção solar",
      needKind: "tag",
      area: "Rosto",
      preference: "sem-preferencia",
      hasAlert: false
    });

    const urls = (result.items as ProductRow[]).map((p) => p.URL_produto);
    expect(urls).toContain("https://example.com/face");
    expect(urls).toContain("https://example.com/ambos");
    expect(urls).not.toContain("https://example.com/maos");
    expect(urls).not.toContain("https://example.com/corporal");
    expect(urls).not.toContain("https://example.com/capilar");
  });

  test("em Rosto sem produto facial, amplia para outras áreas (fallback)", () => {
    const all: ProductRow[] = [
      makeProduct({
        URL_produto: "https://example.com/corpo",
        Produto: "Hidratante corporal",
        need_tags: "hidratação",
        routine_step: "corpo"
      })
    ];

    const result = buildAttendResult(all, {
      need: "hidratação",
      needKind: "tag",
      area: "Rosto",
      preference: "sem-preferencia",
      hasAlert: false
    });

    expect(result.mode).toBe("recommendations");
    expect(result.items.length).toBe(1);
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
