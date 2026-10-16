import { expect, test } from "@playwright/test";
import { mkdirSync } from "node:fs";
import path from "node:path";

const shotDir = path.join("docs", "screenshots", "phase-5");

test.beforeAll(() => {
  mkdirSync(shotDir, { recursive: true });
});

test("lab shows measured offline routing and blocked live Gemini as separate rows", async ({
  page,
}) => {
  await page.goto("/lab");
  const offline = page.locator("tr", { hasText: "P5-R1" });
  const live = page.locator("tr", { hasText: "P5-R2" });
  const heldout = page.locator("tr", { hasText: "P5-S2" });
  const bots = page.locator("tr", { hasText: "P5-C1" });
  await expect(offline).toContainText("MEASURED");
  await expect(offline).toContainText("90.3%");
  await expect(live).toContainText("BLOCKED");
  await expect(live).not.toContainText("90.3%");
  await expect(heldout).toContainText("MEASURED");
  await expect(heldout).toContainText("60.3%");
  await expect(heldout).not.toContainText("90.3%");
  await expect(bots).toContainText("NOT RUN");
});

test("measured held-out artifact does not display routing 90.3% as an SLM score", async ({
  page,
}) => {
  await page.goto("/lab?source=measured&artifact=heldout_v1");
  await expect(page.getByLabel("Bundled MEASURED artifact")).toHaveValue("heldout_v1");
  await expect(page.getByText("heldout_v1 base vs LoRA")).toBeVisible();
  await expect(page.getByText("loraSdgHitRate")).toBeVisible();
  const metricRow = page.locator("tr", { hasText: "loraSdgHitRate" });
  await expect(metricRow).toContainText("60.3%");
  await expect(metricRow).not.toContainText("90.3%");
  await expect(page.getByText("Interactive demonstration using synthetic example data")).toHaveCount(0);
});

test("phase 5 screenshots", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/lab");
  await page.screenshot({
    path: path.join(shotDir, "lab-register-1440.png"),
    fullPage: false,
  });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.screenshot({
    path: path.join(shotDir, "home-390.png"),
    fullPage: false,
  });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/lab?source=measured&artifact=heldout_v1");
  await page.getByText("loraSdgHitRate").scrollIntoViewIfNeeded();
  await page.screenshot({
    path: path.join(shotDir, "lab-heldout-1440.png"),
    fullPage: false,
  });
  await page.goto("/work/slm-finetuning-evaluation");
  await page.getByRole("heading", { name: "Held-out N=13 (separate experiment)" }).scrollIntoViewIfNeeded();
  await page.screenshot({
    path: path.join(shotDir, "slm-case-1440.png"),
    fullPage: false,
  });
});
