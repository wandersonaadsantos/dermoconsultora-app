import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appDir = path.resolve(__dirname, "..");
const repoDir = path.resolve(appDir, "..");

const freezeDir = path.join(repoDir, "drogasil-dermo-scraper", "output", "data-freeze", "v1");
const srcImagesThumb = path.join(repoDir, "drogasil-dermo-scraper", "output", "images", "thumb");
const srcImagesMedium = path.join(repoDir, "drogasil-dermo-scraper", "output", "images", "medium");

const dstDataDir = path.join(appDir, "public", "data", "v1");
const dstThumbDir = path.join(appDir, "public", "assets", "images", "thumb");
const dstMediumDir = path.join(appDir, "public", "assets", "images", "medium");

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function copyFile(srcPath, dstDir) {
  ensureDir(dstDir);
  const name = path.basename(srcPath);
  fs.copyFileSync(srcPath, path.join(dstDir, name));
  return name;
}

function copyJsonStripBom(srcPath, dstDir) {
  ensureDir(dstDir);
  const name = path.basename(srcPath);
  const buf = fs.readFileSync(srcPath);
  const hasBom = buf.length >= 3 && buf[0] === 0xef && buf[1] === 0xbb && buf[2] === 0xbf;
  fs.writeFileSync(path.join(dstDir, name), hasBom ? buf.subarray(3) : buf);
  return name;
}

function readJson(filePath) {
  const raw = fs.readFileSync(filePath, "utf8").replace(/^\uFEFF/, "");
  return JSON.parse(raw);
}

const dataFiles = [
  "base_drogasil_dermoconsulta_enriquecida.json",
  "images_manifest.json",
  "data_freeze_manifest.json",
  "README.md"
];

for (const f of dataFiles) {
  const src = path.join(freezeDir, f);
  if (!fs.existsSync(src)) throw new Error(`Missing freeze file: ${src}`);
  if (f.endsWith(".json")) copyJsonStripBom(src, dstDataDir);
  else copyFile(src, dstDataDir);
}

const imagesManifestPath = path.join(freezeDir, "images_manifest.json");
const imagesManifest = readJson(imagesManifestPath);

let copiedThumb = 0;
let copiedMedium = 0;
let missingThumb = 0;
let missingMedium = 0;

for (const row of imagesManifest) {
  if (!row || row.status !== "downloaded") continue;

  const thumbName = path.basename(String(row.thumbnail_path ?? ""));
  const mediumName = path.basename(String(row.medium_path ?? ""));

  if (thumbName) {
    const src = path.join(srcImagesThumb, thumbName);
    if (fs.existsSync(src)) {
      copyFile(src, dstThumbDir);
      copiedThumb++;
    } else {
      missingThumb++;
    }
  }

  if (mediumName) {
    const src = path.join(srcImagesMedium, mediumName);
    if (fs.existsSync(src)) {
      copyFile(src, dstMediumDir);
      copiedMedium++;
    } else {
      missingMedium++;
    }
  }
}

process.stdout.write(
  JSON.stringify(
    {
      version: "v1",
      dst: {
        data: path.relative(appDir, dstDataDir),
        thumb: path.relative(appDir, dstThumbDir),
        medium: path.relative(appDir, dstMediumDir)
      },
      copied: { thumb: copiedThumb, medium: copiedMedium },
      missing: { thumb: missingThumb, medium: missingMedium }
    },
    null,
    2
  ) + "\n"
);
