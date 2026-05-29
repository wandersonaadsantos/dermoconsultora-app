import fs from "node:fs";
import path from "node:path";
import { expect, test } from "vitest";

function readJson(p: string) {
  return JSON.parse(fs.readFileSync(p, "utf8").replace(/^\uFEFF/, ""));
}

function countFiles(dir: string) {
  if (!fs.existsSync(dir)) return 0;
  return fs.readdirSync(dir, { withFileTypes: true }).filter((e) => e.isFile()).length;
}

test("assets v1 existem e são compatíveis com o manifesto", () => {
  const dataDir = path.join(process.cwd(), "public", "data", "v1");
  const assetsThumbDir = path.join(process.cwd(), "public", "assets", "images", "thumb");
  const assetsMediumDir = path.join(process.cwd(), "public", "assets", "images", "medium");

  const manifestPath = path.join(dataDir, "data_freeze_manifest.json");
  const productsPath = path.join(dataDir, "base_drogasil_dermoconsulta_enriquecida.json");
  const imagesPath = path.join(dataDir, "images_manifest.json");

  expect(fs.existsSync(manifestPath)).toBe(true);
  expect(fs.existsSync(productsPath)).toBe(true);
  expect(fs.existsSync(imagesPath)).toBe(true);

  const manifest = readJson(manifestPath);
  const products = readJson(productsPath);
  const images = readJson(imagesPath);

  expect(manifest.version).toBe("v1");
  expect(products.length).toBe(manifest.total_products);

  const downloaded = images.filter((x: any) => x?.status === "downloaded").length;
  expect(countFiles(assetsThumbDir)).toBe(downloaded);
  expect(countFiles(assetsMediumDir)).toBe(downloaded);
});
