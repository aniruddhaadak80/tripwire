/**
 * Compress the full-page PNGs into web-friendly JPEGs for the README.
 * Run with: bun run scripts/compress-shots.ts
 */
import sharp from "sharp";
import { readdirSync, unlinkSync } from "node:fs";
import { fileURLToPath } from "node:url";

const DIR = fileURLToPath(new URL("../public/screenshots/", import.meta.url));

for (const file of readdirSync(DIR)) {
  if (!file.endsWith(".png")) continue;
  const src = `${DIR}${file}`;
  const dst = src.replace(/\.png$/, ".jpg");
  await sharp(src)
    .resize({ width: 1440, withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(dst);
  const kb = (await sharp(dst).metadata()).size ?? 0;
  console.log(`${file} -> ${dst.split(/[\\/]/).pop()} (${Math.round(kb / 1024)} KB)`);
  unlinkSync(src);
}
console.log("done");