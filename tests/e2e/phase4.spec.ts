import { expect, test } from "@playwright/test";
import { mkdirSync } from "node:fs";
import path from "node:path";

const shotDir = path.join("docs", "screenshots", "phase-4");

test.beforeAll(() => {
  mkdirSync(shotDir, { recursive: true });
});

test("homepage states the positioning line and Cisco-via-TCS role", async ({
  page,
}) => {
  await page.goto("/");
  await expect(
    page.getByText(
      "I build the measurement and routing layers that keep agentic systems honest.",
    ),
  ).toBeVisible();
  await expect(page.getByText(/via Tata Consultancy Services/)).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Workbench (MEASURED routing eval)" }),
  ).toBeVisible();
});

test("mobile hero kicker stays on one line", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const kicker = page.getByText("AI Engineer · Bay Area");
  await expect(kicker).toBeVisible();
  const box = await kicker.boundingBox();
  expect(box && box.height < 28).toBeTruthy();
});

test("lab experiment register shows blocked Gemini without a fake score", async ({
  page,
}) => {
  await page.goto("/lab");
  await expect(page.getByRole("heading", { name: "Experiment status" })).toBeVisible();
  await expect(page.getByText("P5-R2")).toBeVisible();
  await expect(page.getByText("BLOCKED").first()).toBeVisible();
  const geminiRow = page.locator("tr", { hasText: "P5-R2" });
  await expect(geminiRow).not.toContainText("%");
});

test("measured workbench does not show the synthetic banner", async ({
  page,
}) => {
  await page.goto("/lab?source=measured");
  await expect(page.getByText("MEASURED").first()).toBeVisible();
  await expect(
    page.getByText("Interactive demonstration using synthetic example data"),
  ).toHaveCount(0);
  await expect(page.getByText(/N=134/).first()).toBeVisible();
  await expect(page.getByRole("button", { name: /net-006/ })).toBeVisible();
  await page.getByRole("button", { name: /uns-001/ }).click();
  await expect(page.getByRole("article").getByText("Write a haiku about BGP.")).toBeVisible();
});

test("measured JSON import rejects synthetic provenance", async ({ page }) => {
  await page.goto("/lab?source=measured");
  const reject = {
    schemaVersion: "measured-eval-v1",
    provenance: "SYNTHETIC",
    kind: "routing-offline",
    name: "fake",
    datasetId: "x",
    datasetVersion: "x",
    n: 1,
    predictor: "none",
    notMeasured: [],
    limitations: ["x"],
    metrics: { strictAccuracy: 1, macroF1: 1 },
  };
  await page.getByLabel("Paste measured JSON").fill(JSON.stringify(reject));
  await page.getByRole("button", { name: "Validate import" }).click();
  await expect(page.getByTestId("measured-import-error")).toContainText(
    /SYNTHETIC/,
  );
});

test("draft notes are labeled and unpublished on the homepage", async ({
  page,
}) => {
  await page.goto("/");
  await expect(
    page.getByRole("link", { name: "Evaluation before orchestration" }).first(),
  ).toBeVisible();
  await expect(
    page.getByText("Design principles for researcher-facing tools"),
  ).toHaveCount(0);
  await page.goto("/notes");
  await expect(page.getByText("draft").first()).toBeVisible();
});

test("desktop and mobile screenshots", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await page.screenshot({
    path: path.join(shotDir, "home-1440.png"),
    fullPage: false,
  });
  await page.goto("/lab?source=measured");
  await page.screenshot({
    path: path.join(shotDir, "lab-measured-1440.png"),
    fullPage: false,
  });
  await page.goto("/work/ai-infrastructure-network-intelligence");
  await page.screenshot({
    path: path.join(shotDir, "routing-case-1440.png"),
    fullPage: false,
  });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.screenshot({
    path: path.join(shotDir, "home-390.png"),
    fullPage: false,
  });
  await page.goto("/work/ai-infrastructure-network-intelligence");
  await page.screenshot({
    path: path.join(shotDir, "routing-case-390.png"),
    fullPage: false,
  });
  await page.goto("/lab?source=measured");
  await page.screenshot({
    path: path.join(shotDir, "lab-measured-390.png"),
    fullPage: false,
  });
});
