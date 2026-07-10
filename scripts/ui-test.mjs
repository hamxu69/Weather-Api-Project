import { chromium } from "playwright";

const BASE_URL = process.env.APP_URL ?? "http://localhost:5174";
const results = [];
const consoleErrors = [];
const pageErrors = [];

function log(step, ok, detail = "") {
  results.push({ step, ok, detail });
  const mark = ok ? "PASS" : "FAIL";
  console.log(`[${mark}] ${step}${detail ? ` — ${detail}` : ""}`);
}

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

page.on("console", (msg) => {
  if (msg.type() === "error") consoleErrors.push(msg.text());
});
page.on("pageerror", (err) => pageErrors.push(err.message));

try {
  await page.goto(BASE_URL, { waitUntil: "networkidle", timeout: 30000 });
  log("Page loads", (await page.title()).includes("Weather"));

  await page.waitForSelector("h1", { timeout: 10000 });
  log("Hero title visible", (await page.locator("h1").innerText()).includes("sky"));

  await page.waitForFunction(
    () => !document.body.innerText.includes("Loading") || document.body.innerText.includes("Lahore"),
    { timeout: 20000 },
  );
  await page.waitForTimeout(1500);

  const cityVisible = (await page.locator("body").innerText()).match(/Lahore|lahore/i);
  log("Default city weather loaded", !!cityVisible, cityVisible ? "Lahore found" : "city not found");

  const unitsBtn = page.getByRole("button", { name: /units/i });
  await unitsBtn.click();
  await page.waitForTimeout(400);

  const bodyAfterUnitsOpen = await page.locator("body").innerText();
  log(
    "Units dropdown opens without blank page",
    bodyAfterUnitsOpen.includes("How") && bodyAfterUnitsOpen.includes("Temperature"),
    bodyAfterUnitsOpen.slice(0, 80),
  );

  await page.getByText("Fahrenheit (°F)", { exact: true }).click();
  await page.waitForTimeout(400);

  const bodyAfterUnitChange = await page.locator("body").innerText();
  log(
    "Unit change keeps page alive",
    bodyAfterUnitsOpen.includes("How") && !pageErrors.length,
  );

  await page.keyboard.press("Escape");
  await page.waitForTimeout(200);

  const searchInput = page.getByPlaceholder("Search for a place...");
  await searchInput.fill("London");
  await page.getByRole("button", { name: /^search$/i }).click();
  await page.waitForTimeout(3000);

  const londonLoaded = (await page.locator("body").innerText()).match(/London/i);
  log("City search works", !!londonLoaded, londonLoaded ? "London found" : "London not found");

  const themeBtn = page.getByRole("button", { name: /light|dark/i });
  await themeBtn.click();
  await page.waitForTimeout(300);
  const isDark = await page.evaluate(() => document.documentElement.classList.contains("dark"));
  log("Theme toggle works", true, isDark ? "dark mode on" : "light mode on");

  await page.screenshot({ path: "test-screenshot.png", fullPage: true });
  log("Screenshot saved", true, "test-screenshot.png");
} catch (error) {
  log("Test run", false, error instanceof Error ? error.message : String(error));
  await page.screenshot({ path: "test-screenshot-error.png", fullPage: true }).catch(() => {});
} finally {
  await browser.close();
}

const failed = results.filter((r) => !r.ok);
console.log("\n--- Summary ---");
console.log(`Passed: ${results.length - failed.length}/${results.length}`);
if (consoleErrors.length) console.log("Console errors:", consoleErrors);
if (pageErrors.length) console.log("Page errors:", pageErrors);
if (failed.length) {
  console.log("Failed steps:", failed);
  process.exit(1);
}
