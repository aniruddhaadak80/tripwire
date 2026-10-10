/**
 * Real screenshots of the production site, driven through system Chrome.
 * Run with: bun run scripts/screenshots.ts [baseUrl]
 *
 * Output: public/screenshots/*.png (referenced by the README).
 */
import puppeteer from "puppeteer-core";
import { mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";

const BASE = process.argv[2] ?? "https://tripwire-atlas.vercel.app";
const OUT = fileURLToPath(new URL("../public/screenshots/", import.meta.url));
mkdirSync(OUT, { recursive: true });

const CHROME =
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe";

const pages: { name: string; path: string; full?: boolean }[] = [
  { name: "home", path: "/", full: true },
  { name: "atlas", path: "/atlas", full: true },
  { name: "signals", path: "/signals", full: true },
  { name: "prepare", path: "/prepare", full: true },
  { name: "method", path: "/method", full: true },
  { name: "risk-detail", path: "/risk/loss-of-control", full: true },
  { name: "risk-climate", path: "/risk/amoc-collapse", full: true },
];

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  protocolTimeout: 480000,
  args: ["--no-sandbox", "--disable-dev-shm-usage", "--force-color-profile=srgb"],
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

for (const p of pages) {
  const url = `${BASE}${p.path}`;
  await page.goto(url, { waitUntil: "networkidle0", timeout: 90000 });
  // Let scroll-triggered reveals settle and fonts load.
  await page.evaluate(async () => {
    await new Promise((r) => setTimeout(r, 1200));
    window.scrollTo(0, document.body.scrollHeight);
    await new Promise((r) => setTimeout(r, 900));
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 500));
  });
  const file = `${OUT}${p.name}.png`;
  await page.screenshot({ path: file, fullPage: Boolean(p.full), captureBeyondViewport: true });
  console.log(`shot ${p.name} -> ${file}`);
}

await browser.close();
console.log("done");