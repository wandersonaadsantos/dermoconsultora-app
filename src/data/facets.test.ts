import { expect, test } from "vitest";
import { filterProducts, uniqueBrands, uniqueNeedTags } from "./facets";
import type { FilterState } from "./facets";
import type { ProductRow } from "./types";

const BASE_FILTER: FilterState = {
  query: "",
  brand: "all",
  routine_step: "all",
  need_tag: "all",
  caution_level: "all",
  complexity_level: "all",
  price_tier: "all",
  needsOnly: false
};

test("filtra por marca e need_tag", () => {
  const products: ProductRow[] = [
    { URL_produto: "1", Produto: "A", Marca: "X", need_tags: "oleosidade/cravos" },
    { URL_produto: "2", Produto: "B", Marca: "Y", need_tags: "hidratação" }
  ];

  const r = filterProducts(products, { ...BASE_FILTER, brand: "X", need_tag: "oleosidade" });

  expect(r.map((x) => x.URL_produto)).toEqual(["1"]);
});

test("busca textual é case-insensitive e sem acentos", () => {
  const products: ProductRow[] = [{ URL_produto: "1", Produto: "Hidratáção Facial", Marca: "X" }];

  const r = filterProducts(products, { ...BASE_FILTER, query: "hidratacao" });

  expect(r.length).toBe(1);
});

test("busca tokenizada encontra fora de ordem e combina com filtro de marca", () => {
  const products: ProductRow[] = [
    { URL_produto: "1", Produto: "Gel de Limpeza Darrow Actine 140g", Marca: "Darrow" },
    { URL_produto: "2", Produto: "Gel de Limpeza Darrow Actine 300g", Marca: "Darrow" },
    { URL_produto: "3", Produto: "Creme qualquer", Marca: "Outra" }
  ];

  const r = filterProducts(products, { ...BASE_FILTER, query: "gel actine 14 darrow", brand: "Darrow" });

  expect(r[0]?.URL_produto).toBe("1");
  expect(r.map((x) => x.URL_produto)).toContain("1");
});

test("extrai marcas únicas e need_tags únicas", () => {
  const products: ProductRow[] = [
    { URL_produto: "1", Produto: "A", Marca: "X", need_tags: "a/b" },
    { URL_produto: "2", Produto: "B", Marca: "Y", need_tags: "b|c" }
  ];

  expect(uniqueBrands(products)).toEqual(["X", "Y"]);
  expect(uniqueNeedTags(products)).toEqual(["a", "b", "c"]);
});
