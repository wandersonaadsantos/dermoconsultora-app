import type { DataFreezeManifest, ImageManifestRow, ProductRow } from "./types";

export type LoadedDataV1 = {
  manifest: DataFreezeManifest;
  products: ProductRow[];
  images: ImageManifestRow[];
  imageIndex: Map<string, { thumbName: string; mediumName: string; status: string }>;
};

export type LoadDataV1Args = {
  fetchImpl?: typeof fetch;
  baseUrl?: string;
};

function asPrefix(baseUrl: string) {
  return baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
}

function basenameFromRepoPath(p: string) {
  const parts = p.split(/[/\\\\]/).filter(Boolean);
  return parts.length > 0 ? parts[parts.length - 1] : "";
}

function createImageIndex(images: ImageManifestRow[]) {
  const map = new Map<string, { thumbName: string; mediumName: string; status: string }>();
  for (const row of images) {
    const url = String(row.url_produto ?? "").trim();
    if (!url) continue;

    const status = String(row.status ?? "").trim();
    const thumbName = basenameFromRepoPath(String(row.thumbnail_path ?? ""));
    const mediumName = basenameFromRepoPath(String(row.medium_path ?? ""));
    map.set(url, { thumbName, mediumName, status });
  }
  return map;
}

export async function loadDataV1(args: LoadDataV1Args = {}): Promise<LoadedDataV1> {
  const fetchImpl = args.fetchImpl ?? fetch;
  const baseUrl = asPrefix(args.baseUrl ?? import.meta.env.BASE_URL ?? "/");

  const [manifestRes, productsRes, imagesRes] = await Promise.all([
    fetchImpl(`${baseUrl}data/v1/data_freeze_manifest.json`),
    fetchImpl(`${baseUrl}data/v1/base_drogasil_dermoconsulta_enriquecida.json`),
    fetchImpl(`${baseUrl}data/v1/images_manifest.json`)
  ]);

  if (!manifestRes.ok) throw new Error("failed to load data_freeze_manifest.json");
  if (!productsRes.ok) throw new Error("failed to load base_drogasil_dermoconsulta_enriquecida.json");
  if (!imagesRes.ok) throw new Error("failed to load images_manifest.json");

  const parseJson = async <T,>(res: Response) => {
    const text = (await res.text()).replace(/^\uFEFF/, "");
    return JSON.parse(text) as T;
  };

  const manifest = await parseJson<DataFreezeManifest>(manifestRes);
  const products = await parseJson<ProductRow[]>(productsRes);
  const images = await parseJson<ImageManifestRow[]>(imagesRes);

  if (manifest.version !== "v1") throw new Error(`unexpected manifest version: ${manifest.version}`);
  if (!manifest.can_start_app) throw new Error("data freeze manifest indicates can_start_app=false");

  if (manifest.total_products > 0 && products.length !== manifest.total_products) {
    throw new Error(`product count mismatch: expected ${manifest.total_products} got ${products.length}`);
  }

  const imageIndex = createImageIndex(images);
  return { manifest, products, images, imageIndex };
}

export type LoadDataV2Args = LoadDataV1Args;

export async function loadDataV2(args: LoadDataV2Args = {}): Promise<LoadedDataV1> {
  const fetchImpl = args.fetchImpl ?? fetch;
  const baseUrl = asPrefix(args.baseUrl ?? import.meta.env.BASE_URL ?? "/");

  const [manifestRes, productsRes, imagesRes] = await Promise.all([
    fetchImpl(`${baseUrl}data/v2/data_freeze_manifest.json`),
    fetchImpl(`${baseUrl}data/v2/base_drogasil_dermoconsulta_enriquecida.json`),
    fetchImpl(`${baseUrl}data/v2/images_manifest.json`)
  ]);

  if (!manifestRes.ok) throw new Error("failed to load data_freeze_manifest.json");
  if (!productsRes.ok) throw new Error("failed to load base_drogasil_dermoconsulta_enriquecida.json");
  if (!imagesRes.ok) throw new Error("failed to load images_manifest.json");

  const parseJson = async <T,>(res: Response) => {
    const text = (await res.text()).replace(/^\uFEFF/, "");
    return JSON.parse(text) as T;
  };

  const manifest = await parseJson<DataFreezeManifest>(manifestRes);
  const products = await parseJson<ProductRow[]>(productsRes);
  const images = await parseJson<ImageManifestRow[]>(imagesRes);

  if (manifest.version !== "v2") throw new Error(`unexpected manifest version: ${manifest.version}`);
  if (!manifest.can_start_app) throw new Error("data freeze manifest indicates can_start_app=false");

  if (manifest.total_products > 0 && products.length !== manifest.total_products) {
    throw new Error(`product count mismatch: expected ${manifest.total_products} got ${products.length}`);
  }

  const imageIndex = createImageIndex(images);
  return { manifest, products, images, imageIndex };
}

export function getProductThumbUrl(baseUrl: string, row: ProductRow, imageIndex: LoadedDataV1["imageIndex"]) {
  const prefix = asPrefix(baseUrl);
  const url = String(row.URL_produto ?? "").trim();
  const fromIndex = url ? imageIndex.get(url) : undefined;
  const name = fromIndex?.thumbName || basenameFromRepoPath(String(row.thumbnail_path ?? ""));
  return name ? `${prefix}assets/images/thumb/${name}` : "";
}

export function getProductMediumUrl(baseUrl: string, row: ProductRow, imageIndex: LoadedDataV1["imageIndex"]) {
  const prefix = asPrefix(baseUrl);
  const url = String(row.URL_produto ?? "").trim();
  const fromIndex = url ? imageIndex.get(url) : undefined;
  const name = fromIndex?.mediumName || basenameFromRepoPath(String(row.medium_path ?? ""));
  return name ? `${prefix}assets/images/medium/${name}` : "";
}
