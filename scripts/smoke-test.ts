/**
 * Full-site smoke test: HTTP checks + headless Chrome console-error check.
 * Run with: bun run scripts/smoke-test.ts [baseUrl]
 *
 * Exits non-zero if anything fails — safe for CI.
 */
import puppeteer from "puppeteer-core";

import { domains } from "../data/domains";
import { risks } from "../data";

const BASE = process.argv[2] ?? "https://tripwire-atlas.vercel.app";
const CHROME = "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe";

let failures = 0;
const fail = (msg: string) => {
  failures += 1;
  console.error(`  ✗ ${msg}`);
};
const pass = (msg: string) => console.log(`  ✓ ${msg}`);

// ---------- HTTP phase ----------
const routes: { path: string; expect: string }[] = [
  { path: "/", expect: "could go wrong" },
  { path: "/atlas", expect: "atlas of" },
  { path: "/matrix", expect: "risk" },
  { path: "/timeline", expect: "events" },
  { path: "/signals", expect: "Signals board" },
  { path: "/prepare", expect: "readiness" },
  { path: "/method", expect: "exposure" },
  { path: "/data", expect: "risks.json" },
  { path: "/compare?slugs=ransomware-ice,amoc-collapse", expect: "Compare" },
  { path: "/domain/ai", expect: "Machine Intelligence" },
  { path: "/domain/space", expect: "Orbit" },
  { path: "/feed.xml", expect: "<rss" },
  { path: "/robots.txt", expect: "User-Agent" },
  { path: "/sitemap.xml", expect: "<urlset" },
  { path: "/data/risks.json", expect: "amoc-collapse" },
  { path: "/data/signals.json", expect: "status" },
  { path: "/data/precautions.json", expect: "audience" },
  { path: "/data/summary.json", expect: "counts" },
  { path: "/risk/loss-of-control", expect: "What would change this score" },
  { path: "/risk/amoc-collapse", expect: "AMOC" },
  { path: "/risk/income-single-point", expect: "Income" },
  { path: "/nope", expect: "" }, // 404 expected — checked separately
];

console.log(`HTTP phase — ${BASE}`);
for (const { path, expect } of routes) {
  const res = await fetch(`${BASE}${path}`);
  const text = await res.text();
  if (path === "/nope") {
    if (res.status === 404) pass("404 page");
    else fail(`404 page returned ${res.status}`);
    continue;
  }
  if (res.status !== 200) fail(`${path} → ${res.status}`);
  else if (expect && !text.includes(expect)) fail(`${path} missing "${expect}"`);
  else pass(`${path} (${res.status})`);
}

// All risk pages
let riskOk = 0;
for (const r of risks) {
  const res = await fetch(`${BASE}/risk/${r.slug}`);
  if (res.status === 200 && (await res.text()).includes(r.title)) riskOk += 1;
  else fail(`/risk/${r.slug} failed`);
}
if (riskOk === risks.length) pass(`all ${risks.length} risk pages`);
else fail(`${riskOk}/${risks.length} risk pages`);

// All domain pages
let domOk = 0;
for (const d of domains) {
  const res = await fetch(`${BASE}/domain/${d.id}`);
  if (res.status === 200) domOk += 1;
  else fail(`/domain/${d.id} failed`);
}
if (domOk === domains.length) pass(`all ${domains.length} domain pages`);
else fail(`${domOk}/${domains.length} domain pages`);

// ---------- Browser phase ----------
console.log("Browser phase — console errors, interactions");
const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  protocolTimeout: 300000,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });

const consoleErrors: string[] = [];
const pageErrors: string[] = [];
page.on("console", (m) => m.type() === "error" && consoleErrors.push(m.text()));
page.on("pageerror", (e) => pageErrors.push(String(e)));

const browserRoutes = ["/", "/atlas", "/matrix", "/timeline", "/signals", "/prepare", "/method", "/data", "/compare?slugs=ransomware-ice,amoc-collapse", "/risk/loss-of-control", "/domain/ai"];
for (const path of browserRoutes) {
  consoleErrors.length = 0;
  pageErrors.length = 0;
  try {
    await page.goto(`${BASE}${path}`, { waitUntil: "networkidle0", timeout: 90000 });
    await new Promise((r) => setTimeout(r, 800));
    if (consoleErrors.length) fail(`${path} console errors: ${consoleErrors.join(" | ")}`);
    else if (pageErrors.length) fail(`${path} page errors: ${pageErrors.join(" | ")}`);
    else pass(`${path} clean`);
  } catch (e) {
    fail(`${path} navigation failed: ${e}`);
  }
}

// Interaction: ⌘K palette opens and navigates
try {
  await page.goto(`${BASE}/`, { waitUntil: "networkidle0", timeout: 90000 });
  await page.keyboard.press("Control+k" as never);
  await new Promise((r) => setTimeout(r, 700));
  const paletteOpen = await page.evaluate(() => !!document.querySelector('input[placeholder*="Search"]'));
  if (paletteOpen) pass("⌘K palette opens");
  else fail("⌘K palette did not open");
  await page.keyboard.type("amoc");
  await new Promise((r) => setTimeout(r, 500));
  await page.keyboard.press("Enter");
  await new Promise((r) => setTimeout(r, 1500));
  if (page.url().includes("/risk/amoc-collapse")) pass("⌘K search navigates to amoc-collapse");
  else fail(`⌘K navigation landed on ${page.url()}`);
} catch (e) {
  fail(`⌘K interaction failed: ${e}`);
}

// Interaction: matrix bubbles render
try {
  await page.goto(`${BASE}/matrix`, { waitUntil: "networkidle0", timeout: 90000 });
  await new Promise((r) => setTimeout(r, 1200));
  const circles = await page.$$("circle");
  pass(`matrix renders ${circles.length} bubbles`);
} catch (e) {
  fail(`matrix check failed: ${e}`);
}

// Interaction: prepare plan persists
try {
  await page.goto(`${BASE}/prepare`, { waitUntil: "networkidle0", timeout: 90000 });
  await new Promise((r) => setTimeout(r, 1000));
  await page.evaluate(() => {
    const boxes = document.querySelectorAll('[role="checkbox"]');
    (boxes[0] as HTMLElement | null)?.click();
  });
  await new Promise((r) => setTimeout(r, 500));
  await page.reload({ waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 800));
  const persisted = await page.evaluate(() => {
    const boxes = document.querySelectorAll('[role="checkbox"][aria-checked="true"]');
    return boxes.length > 0;
  });
  if (persisted) pass("prepare plan persists across reload");
  else fail("prepare plan did not persist");
} catch (e) {
  fail(`prepare persistence failed: ${e}`);
}

await browser.close();

console.log("");
if (failures) {
  console.error(`SMOKE TEST FAILED — ${failures} problem(s)`);
  process.exit(1);
} else {
  console.log("SMOKE TEST PASSED — everything green");
}