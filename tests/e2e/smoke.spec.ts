import { expect, test } from "@playwright/test";

test("home renders the name and primary CTAs", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Sumalya Patnala" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Explore my work" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Open Evaluation Workbench" })).toBeVisible();
});

test("work index and a case study load", async ({ page }) => {
  await page.goto("/work");
  await page.getByRole("link", { name: "Case study" }).first().click();
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Problem and why it matters" })).toBeVisible();
});

test("evaluation workbench uses the synthetic banner and can open a case", async ({
  page,
}) => {
  await page.goto("/lab");
  await expect(page.getByRole("status")).toContainText(
    "Interactive demonstration using synthetic example data",
  );
  await page.getByRole("button", { name: /vqa-01/ }).click();
  await expect(page.getByRole("heading", { name: /Trace/ })).toBeVisible();
});

test("research page does not claim publication", async ({ page }) => {
  await page.goto("/research");
  await expect(page.getByText(/not verified as published/i).first()).toBeVisible();
});
