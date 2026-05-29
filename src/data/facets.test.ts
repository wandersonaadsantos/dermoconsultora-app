import { expect, test } from "vitest";
import { filterProducts, uniqueBrands, uniqueNeedTags } from "./facets";

test("filtra por marca e need_tag", () => {
  const products: any[] = [
    { URL_produto: "1", Produto: "A", Marca: "X", need_tags: "oleosidade/cravos" },
    { URL_produto: "2", Produto: "B", Marca: "Y", need_tags: "hidratação" }
  ];

  const r = filterProducts(products as any, {
    query: "",
    brand: "X",
    routine_step: "all",
    need_tag: "oleosidade",
    caution_level: "all",
    complexity_level: "all",
    needsOnly: false
  });

  expect(r.map((x) => x.URL_produto)).toEqual(["1"]);
});

test("busca textual é case-insensitive e sem acentos", () => {
  const products: any[] = [{ URL_produto: "1", Produto: "Hidratáção Facial", Marca: "X" }];

  const r = filterProducts(products as any, {
    query: "hidratacao",
    brand: "all",
    routine_step: "all",
    need_tag: "all",
    caution_level: "all",
    complexity_level: "all",
    needsOnly: false
  });

  expect(r.length).toBe(1);
});

test("busca tokenizada encontra fora de ordem e combina com filtro de marca", () => {
  const products: any[] = [
    { URL_produto: "1", Produto: "Gel de Limpeza Darrow Actine 140g", Marca: "Darrow" },
    { URL_produto: "2", Produto: "Gel de Limpeza Darrow Actine 300g", Marca: "Darrow" },
    { URL_produto: "3", Produto: "Creme qualquer", Marca: "Outra" }
  ];

  const r = filterProducts(products as any, {
    query: "gel actine 14 darrow",
    brand: "Darrow",
    routine_step: "all",
    need_tag: "all",
    caution_level: "all",
    complexity_level: "all",
    needsOnly: false
  });

  expect(r[0]?.URL_produto).toBe("1");
  expect(r.map((x) => x.URL_produto)).toContain("1");
});

test("extrai marcas únicas e need_tags únicas", () => {
  const products: any[] = [
    { URL_produto: "1", Produto: "A", Marca: "X", need_tags: "a/b" },
    { URL_produto: "2", Produto: "B", Marca: "Y", need_tags: "b|c" }
  ];

  expect(uniqueBrands(products as any)).toEqual(["X", "Y"]);
  expect(uniqueNeedTags(products as any)).toEqual(["a", "b", "c"]);
});
