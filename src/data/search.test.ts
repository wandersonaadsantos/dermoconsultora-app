import { describe, expect, test } from "vitest";
import type { ProductRow } from "./types";
import { searchProducts } from "./search";

function p(partial: Partial<ProductRow> & { URL_produto: string; Produto: string; Marca: string }): ProductRow {
  return partial as ProductRow;
}

describe("searchProducts", () => {
  const products: ProductRow[] = [
    p({
      URL_produto: "https://www.drogasil.com.br/actine-140g.html",
      Produto: "Gel de Limpeza Darrow Actine 140g",
      Marca: "Darrow",
      routine_step: "limpeza",
      need_tags: "oleosidade|cravos"
    }),
    p({
      URL_produto: "https://www.drogasil.com.br/outro.html",
      Produto: "Creme Hidratante Neutro 200g",
      Marca: "Genérico",
      routine_step: "hidratação",
      need_tags: "hidratação"
    })
  ];

  test("encontra por tokens completos", () => {
    const r = searchProducts(products, "gel de limpeza darrow actine 14");
    expect(r.items[0]?.URL_produto).toBe("https://www.drogasil.com.br/actine-140g.html");
  });

  test("encontra por tokens fora de ordem", () => {
    const r = searchProducts(products, "gel darrow actine 14");
    expect(r.items[0]?.URL_produto).toBe("https://www.drogasil.com.br/actine-140g.html");
  });

  test("encontra por marca/linha", () => {
    const r = searchProducts(products, "darrow actine");
    expect(r.items.length).toBe(1);
    expect(r.items[0]?.Marca).toBe("Darrow");
  });

  test("número parcial encontra sufixo (140g)", () => {
    const r = searchProducts(products, "actine 140");
    expect(r.items[0]?.Produto).toContain("140g");
  });

  test("prefixo parcial encontra limpeza", () => {
    const r = searchProducts(products, "limp");
    expect(r.items[0]?.URL_produto).toBe("https://www.drogasil.com.br/actine-140g.html");
  });

  test("prefixo parcial encontra hidratação", () => {
    const r = searchProducts(products, "hidrat");
    expect(r.items[0]?.URL_produto).toBe("https://www.drogasil.com.br/outro.html");
  });

  test("query irrelevante não retorna tudo", () => {
    const r = searchProducts(products, "de da do e com para");
    expect(r.items.length).toBe(0);
  });
});
