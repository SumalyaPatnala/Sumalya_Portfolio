import { expect, test, type ConsoleMessage } from "@playwright/test";

test("homepage first viewport names the Cisco-via-TCS role and primary actions", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Sumalya Patnala" })).toBeVisible();
  await expect(
    page.getByText("AI Engineer, AI Incubation at Cisco"),
  ).toBeVisible();
  await expect(page.getByText(/via Tata Consultancy Services/)).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Open Evaluation Workbench" }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "View GitHub" })).toBeVisible();
  await expect(page.getByText(/Loading case study/)).toHaveCount(0);
});

test("desktop navigation is visible at lg width", async ({ page }) => {
  await page.setViewportSize({ width: 1100, height: 800 });
  await page.goto("/");
  await expect(page.getByRole("navigation", { name: "Primary" })).toBeVisible();
  await expect(
    page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Work" }),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Menu" })).toHaveCount(0);
});

test("mobile menu exposes résumé and workbench", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Menu" }).click();
  const menu = page.locator("#mobile-menu");
  await expect(menu.getByRole("link", { name: "Résumé" })).toBeVisible();
  await expect(menu.getByRole("link", { name: "Evaluation Workbench" })).toBeVisible();
  await expect(menu.getByRole("link", { name: "Work", exact: true })).toBeVisible();
});

test("skip to content moves focus to main", async ({ page }) => {
  await page.goto("/");
  const skip = page.getByRole("link", { name: "Skip to content" });
  const box = await skip.boundingBox();
  expect(box && box.x + box.width < 0).toBeTruthy();
  await page.keyboard.press("Tab");
  await expect(skip).toBeFocused();
  const focused = await skip.boundingBox();
  expect(focused && focused.x >= 0 && focused.width > 8).toBeTruthy();
  await skip.press("Enter");
  await expect(page.locator("#main")).toBeFocused();
});

test("direct case-study load has no loading flash", async ({ page }) => {
  const seen: string[] = [];
  page.on("console", (message: ConsoleMessage) => {
    if (message.type() === "error") seen.push(message.text());
  });
  await page.goto("/work/ai-infrastructure-network-intelligence");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    /AI Infrastructure/,
  );
  await expect(page.getByText("Loading case study…")).toHaveCount(0);
  await expect(
    page.getByText("RoutingDecision and invalid-route fallback"),
  ).toBeVisible();
  expect(seen.join("\n")).not.toMatch(/Hydration|did not match|Minified React error/i);
});

test("workbench dataset switch persists in the URL and shows dual failure labels", async ({
  page,
}) => {
  await page.goto("/lab");
  await expect(page.getByRole("status").first()).toContainText(
    "Interactive demonstration using synthetic example data",
  );
  await page.getByLabel("Dataset").selectOption("synth-agent-ops");
  await expect(page).toHaveURL(/dataset=synth-agent-ops/);
  await page.getByRole("button", { name: /ops-03/ }).click();
  await expect(page).toHaveURL(/case=ops-03/);
  await expect(page.getByText(/Failure · Tool error · Ungrounded claim/)).toBeVisible();
  await expect(page.getByText(/output 0%/i).first()).toBeVisible();
});

test("lexical vqa-06 shows timeout and ungrounded together", async ({ page }) => {
  await page.goto("/lab?dataset=synth-vendor-qa&configs=lexical-rag&case=vqa-06");
  await expect(page.getByRole("heading", { name: /Trace · vqa-06/ })).toBeVisible();
  await expect(page.getByText(/Failure · Timeout · Ungrounded claim/)).toBeVisible();
});

test("keyboard can open a workbench case", async ({ page }) => {
  await page.goto("/lab");
  const caseButton = page.getByRole("button", { name: /vqa-01/ });
  await caseButton.focus();
  await expect(caseButton).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("heading", { name: /Trace · vqa-01/ })).toBeVisible();
});

test("architecture diagrams do not overflow at 390px", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/work/ai-infrastructure-network-intelligence");
  const overflow = await page.evaluate(() => {
    const figures = [...document.querySelectorAll("figure")];
    return figures.some((node) => node.scrollWidth > node.clientWidth + 2);
  });
  expect(overflow).toBe(false);
});

test("configuration checkboxes are clickable below the sticky header", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/lab");
  const hybrid = page.getByRole("checkbox", { name: /Hybrid \+ groundedness gate/i });
  await hybrid.click();
  await expect(hybrid).not.toBeChecked();
  await hybrid.click();
  await expect(hybrid).toBeChecked();
});
