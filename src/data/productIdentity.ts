import type { ProductRow } from "./types";

export function getProductIdentity(product: ProductRow) {
  return String(product.URL_produto ?? "").trim();
}

function uniqueProductId(product: ProductRow, products?: ProductRow[]) {
  const id = String((product as ProductRow & { product_id?: unknown }).product_id ?? "").trim();
  if (!id) return "";
  if (!products) return id;

  let count = 0;
  for (const p of products) {
    const pid = String((p as ProductRow & { product_id?: unknown }).product_id ?? "").trim();
    if (pid === id) count += 1;
  }
  return count === 1 ? id : "";
}

export function getProductRouteId(product: ProductRow, products?: ProductRow[]) {
  const sourceHash = String((product as ProductRow & { source_hash?: unknown }).source_hash ?? "").trim();
  if (sourceHash) return sourceHash;

  const pid = uniqueProductId(product, products);
  if (pid) return pid;

  return encodeURIComponent(getProductIdentity(product));
}

export function findProductByRouteId(products: ProductRow[], routeId: string) {
  const rid = String(routeId ?? "").trim();
  if (!rid) return undefined;

  const byHash = products.filter((p) => String((p as ProductRow & { source_hash?: unknown }).source_hash ?? "").trim() === rid);
  if (byHash.length === 1) return byHash[0];

  const byPid = products.filter((p) => String((p as ProductRow & { product_id?: unknown }).product_id ?? "").trim() === rid);
  if (byPid.length === 1) {
    const pid = String((byPid[0] as ProductRow & { product_id?: unknown }).product_id ?? "").trim();
    if (uniqueProductId(byPid[0], products) === pid) return byPid[0];
  }

  const byUrl = products.find((p) => getProductIdentity(p) === rid);
  if (byUrl) return byUrl;

  try {
    const decoded = decodeURIComponent(rid);
    return products.find((p) => getProductIdentity(p) === decoded);
  } catch {
    return undefined;
  }
}

