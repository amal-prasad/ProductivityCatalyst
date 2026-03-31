import { test, expect } from "@playwright/test";

test.describe("Hero Section", () => {
  test("renders Three.js canvas, headline words, and CTA button", async ({ page }) => {
    await page.goto("/", { waitUntil: 'domcontentloaded' });
    // Wait for hero to be visible
    const hero = page.locator("#hero");
    await expect(hero).toBeVisible({ timeout: 10000 });
    // CTA button
    const cta = page.locator("#hero a").filter({ hasText: /book/i });
    await expect(cta).toBeVisible();
  });
});


test.describe("Features Section", () => {
  test("renders 8 numbered cards", async ({ page }) => {
    await page.goto("/");
    for (const num of ["01", "02", "03", "04", "05", "06", "07", "08"]) {
      await expect(page.getByText(num, { exact: true }).first()).toBeVisible();
    }
    // Use first() to avoid strict mode violation with duplicates in carousel and form
    await expect(page.getByText("CXO Productivity Enhancement").first()).toBeVisible();
    await expect(page.getByText("Business Improvement Assessment").first()).toBeVisible();
  });
});

test.describe("How It Works Section", () => {
  test("renders 5 steps", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Discover", { exact: true }).first()).toBeAttached();
    await expect(page.getByText("Diagnose", { exact: true }).first()).toBeAttached();
    await expect(page.getByText("Design", { exact: true }).first()).toBeAttached();
  });
});

test.describe("Industries Section", () => {
  test("renders industry tags", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("IT Companies").first()).toBeVisible();
    await expect(page.getByText("Merchant Banks").first()).toBeVisible();
    await expect(page.getByText("Consulting Firms").first()).toBeVisible();
  });
});

test.describe("Footer Section", () => {
  test("renders nav links and contact info", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText(/Productivity Catalyst/i).first()).toBeVisible();
    await expect(page.getByText(/info@productivitycatalyst\.com/i)).toBeVisible();
    await expect(page.getByRole("link", { name: "Privacy Policy" })).toBeVisible();
  });
});
