import { describe, expect, test } from "vitest";
import type { ProductRow } from "./types";
import { findProductByRouteId, getProductIdentity, getProductRouteId } from "./productIdentity";

function p(partial: Partial<ProductRow> & { URL_produto: string; Produto: string; Marca: string }): ProductRow {
  return partial as ProductRow;
}

describe("productIdentity", () => {
  test("getProductIdentity usa URL_produto", () => {
    const a = p({
      URL_produto: "https://www.drogasil.com.br/a.html",
      Produto: "Mesmo nome",
      Marca: "Mesma marca"
    });
    const b = p({
      URL_produto: "https://www.drogasil.com.br/b.html",
      Produto: "Mesmo nome",
      Marca: "Mesma marca"
    });
    expect(getProductIdentity(a)).toBe("https://www.drogasil.com.br/a.html");
    expect(getProductIdentity(b)).toBe("https://www.drogasil.com.br/b.html");
    expect(getProductIdentity(a)).not.toBe(getProductIdentity(b));
  });

  test("produto com source_hash resolve pela rota", () => {
    const products = [
      p({
        URL_produto: "https://www.drogasil.com.br/a.html",
        Produto: "A",
        Marca: "X",
        source_hash: "aaaaaaaa"
      })
    ];

    const routeId = getProductRouteId(products[0], products);
    expect(routeId).toBe("aaaaaaaa");
    expect(findProductByRouteId(products, "aaaaaaaa")?.URL_produto).toBe("https://www.drogasil.com.br/a.html");
  });

  test("produto sem source_hash resolve por fallback quando product_id não é único", () => {
    const a = p({
      URL_produto: "https://www.drogasil.com.br/a.html",
      Produto: "A",
      Marca: "X",
      product_id: "1"
    });
    const b = p({
      URL_produto: "https://www.drogasil.com.br/b.html",
      Produto: "B",
      Marca: "Y",
      product_id: "1"
    });
    const products = [a, b];

    const routeIdA = getProductRouteId(a, products);
    expect(routeIdA).toBe(encodeURIComponent("https://www.drogasil.com.br/a.html"));

    expect(findProductByRouteId(products, "https://www.drogasil.com.br/a.html")?.URL_produto).toBe(
      "https://www.drogasil.com.br/a.html"
    );
  });

  test("produto sem source_hash resolve por product_id quando é único", () => {
    const a = p({
      URL_produto: "https://www.drogasil.com.br/a.html",
      Produto: "A",
      Marca: "X",
      product_id: "1"
    });
    const b = p({
      URL_produto: "https://www.drogasil.com.br/b.html",
      Produto: "B",
      Marca: "Y",
      product_id: "2"
    });
    const products = [a, b];

    const routeIdA = getProductRouteId(a, products);
    expect(routeIdA).toBe("1");
    expect(findProductByRouteId(products, "1")?.URL_produto).toBe("https://www.drogasil.com.br/a.html");
  });
});

