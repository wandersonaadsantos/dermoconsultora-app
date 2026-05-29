import { expect, test } from "vitest";
import type { ProductRow } from "./types";
import { getSimilarProducts } from "./similarProducts";

function p(partial: Partial<ProductRow> & Pick<ProductRow, "URL_produto" | "Produto" | "Marca">): ProductRow {
  return partial as ProductRow;
}

test("getSimilarProducts_prioriza_mesmo_comparison_group", () => {
  const current = p({
    URL_produto: "a",
    Produto: "A",
    Marca: "X",
    comparison_group: "g1",
    routine_step: "limpeza",
    need_tags: "oleosidade|acne",
    price_tier: "medio"
  });

  const sameGroup = p({
    URL_produto: "b",
    Produto: "B",
    Marca: "Y",
    comparison_group: "g1",
    routine_step: "tratamento",
    need_tags: "hidratação"
  });

  const sameStep = p({
    URL_produto: "c",
    Produto: "C",
    Marca: "Y",
    comparison_group: "g2",
    routine_step: "limpeza",
    need_tags: "hidratação"
  });

  const overlapNeeds = p({
    URL_produto: "d",
    Produto: "D",
    Marca: "Y",
    comparison_group: "g2",
    routine_step: "outros",
    need_tags: "acne"
  });

  const res = getSimilarProducts([current, sameStep, overlapNeeds, sameGroup], current, 8);
  expect(res.items[0]?.product.URL_produto).toBe("b");
  expect(res.items[0]?.reason).toBe("Mesmo grupo de comparação");
});

test("getSimilarProducts_nao_inclui_o_proprio_produto", () => {
  const current = p({ URL_produto: "a", Produto: "A", Marca: "X", routine_step: "limpeza" });
  const other = p({ URL_produto: "b", Produto: "B", Marca: "Y", routine_step: "limpeza" });
  const res = getSimilarProducts([current, other], current, 8);
  expect(res.items.some((i) => i.product.URL_produto === "a")).toBe(false);
});

test("getSimilarProducts_grupo_outros_nao_e_tratado_como_substituto_direto", () => {
  const current = p({
    URL_produto: "a",
    Produto: "A",
    Marca: "X",
    comparison_group: "tratamento_cosmetico_outros",
    routine_step: "tratamento"
  });

  const sameGroupOnly = p({
    URL_produto: "b",
    Produto: "B",
    Marca: "Y",
    comparison_group: "tratamento_cosmetico_outros",
    routine_step: "outros"
  });

  const res = getSimilarProducts([current, sameGroupOnly], current, 8);
  expect(res.warningOutros).toBe(true);
  expect(res.items.length).toBe(0);
});

