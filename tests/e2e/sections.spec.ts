import { test, expect } from "@playwright/test";

test.describe("Hero Section", () => {
  test("renders Three.js canvas, headline words, and CTA button", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    // Three.js canvas is mounted inside the hero section
    const canvas = page.locator("#hero canvas");
    await expect(canvas).toBeVisible();
    // Headline section contains both headline blocks — use partial text in parent
    const hero = page.locator("#hero");
    await expect(hero).toContainText("CLARITY");
    await expect(hero).toContainText("EVERY TEAM");
    // CTA button
    const cta = page.locator("#hero a").filter({ hasText: /request a demo/i });
    await expect(cta).toBeVisible();
  });
});


test.describe("Features Section", () => {
  test("renders 4 numbered cards", async ({ page }) => {
    await page.goto("/");
    for (const num of ["01", "02", "03", "04"]) {
      await expect(page.getByText(num, { exact: true }).first()).toBeVisible();
    }
    await expect(page.getByText("Real-Time Team Visibility")).toBeVisible();
    await expect(page.getByText("Zero Blind Spots")).toBeVisible();
  });
});

test.describe("How It Works Section", () => {
  test("renders 3 steps", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Connect Your Teams")).toBeVisible();
    await expect(page.getByText("Track Everything Live")).toBeVisible();
    await expect(page.getByText("Eliminate the Silos")).toBeVisible();
  });
});

test.describe("Industries Section", () => {
  test("renders industry tags", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("IT Companies")).toBeVisible();
    await expect(page.getByText("Merchant Banks")).toBeVisible();
    await expect(page.getByText("Consulting Firms")).toBeVisible();
  });
});

test.describe("Footer Section", () => {
  test("renders nav links and copyright", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText(/Productivity Catalyst/i).first()).toBeVisible();
    await expect(page.getByText(/All rights reserved/i)).toBeVisible();
    await expect(page.getByRole("link", { name: "Privacy Policy" })).toBeVisible();
  });
});
