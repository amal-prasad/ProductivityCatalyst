import { test, expect } from "@playwright/test";

test.describe("Navbar Component", () => {
  test("renders logo and desktop links", async ({ page, isMobile }) => {
    await page.goto("/");
    
    // Logo should always be visible
    await expect(page.getByText("Productivity Catalyst").first()).toBeVisible();

    if (!isMobile) {
      const desktopNav = page.locator("nav.hidden.md\\:flex");
      await expect(desktopNav.getByRole("link", { name: "Features" })).toBeVisible();
      await expect(desktopNav.getByRole("link", { name: "How It Works" })).toBeVisible();
      await expect(desktopNav.getByRole("link", { name: "Industries" })).toBeVisible();
      await expect(desktopNav.getByRole("link", { name: "Request a Demo" })).toBeVisible();
    } else {
      await expect(page.getByLabel("Toggle menu")).toBeVisible();
    }
  });

  test("mobile menu overlay toggle", async ({ page, isMobile }) => {
    test.skip(!isMobile, "This test is for mobile only");
    
    await page.goto("/");
    
    const menuToggle = page.getByLabel("Toggle menu");
    await expect(menuToggle).toBeVisible();
    
    // Open menu
    await menuToggle.click();
    
    // The mobile overlay should become visible
    // We select the nav that is a child of the flex-col mobile overlay
    const mobileNav = page.locator("div.fixed.inset-0.bg-background nav");
    await expect(mobileNav.getByRole("link", { name: "Features" })).toBeVisible();
    await expect(mobileNav.getByRole("link", { name: "Request a Demo" })).toBeVisible();
  });
});
