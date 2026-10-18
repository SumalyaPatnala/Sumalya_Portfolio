import { expect, test } from "@playwright/test";
import { mkdirSync } from "node:fs";
import path from "node:path";

const shotDir = path.join("docs", "screenshots", "phase-6");

test.beforeAll(() => {
  mkdirSync(shotDir, { recursive: true });
});

test("homepage keeps engineering tagline before the philosophy", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByText(
      "I build the measurement and routing layers that keep agentic systems honest.",
    ),
  ).toBeVisible();
  await expect(
    page.locator("#main").getByText(
      "Advance intelligence. Respect its footprint. Improve what comes next.",
    ),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "How I Build" }).first()).toBeVisible();
});

test("intelligence within limits page is labeled in development", async ({ page }) => {
  await page.goto("/research/intelligence-within-limits");
  await expect(page.getByRole("status")).toContainText(
    "Mathematical novelty and empirical findings have not yet been established",
  );
  await expect(page.getByText(/does not estimate kg CO/i)).toBeVisible();
  await expect(page.getByText(/reduced carbon by|kWh saved/i)).toHaveCount(0);
});

test("how I build links to measured work", async ({ page }) => {
  await page.goto("/practice");
  await expect(page.getByRole("heading", { name: "How I Build" })).toBeVisible();
  await expect(page.getByRole("link", { name: "SLM evaluation" }).first()).toBeVisible();
});

test("research hub still marks the SFSU prototype unpublished", async ({ page }) => {
  await page.goto("/research");
  await expect(page.getByText(/not verified as published/i).first()).toBeVisible();
  await expect(page.getByRole("link", { name: "Open the research brief" })).toBeVisible();
});

test("phase 6 screenshots", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await page.screenshot({ path: path.join(shotDir, "home-1440.png"), fullPage: false });
  await page.goto("/research/intelligence-within-limits");
  await page.screenshot({ path: path.join(shotDir, "limits-1440.png"), fullPage: false });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.screenshot({ path: path.join(shotDir, "home-390.png"), fullPage: false });
  await page.goto("/practice");
  await page.screenshot({ path: path.join(shotDir, "practice-390.png"), fullPage: false });
});

test("reduced-motion does not hide primary copy", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(
    page.getByText(
      "I build the measurement and routing layers that keep agentic systems honest.",
    ),
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "Sumalya Patnala" })).toBeVisible();
});
