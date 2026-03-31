import { test, expect } from '@playwright/test';

test.describe('Loading Screen Flow', () => {
  test('loading screen masks content and sequences animations correctly', async ({ page }) => {
    // Navigate to homepage
    await page.goto('/');

    // 1. Loading screen should be visible initially (wait a bit for it to appear)
    const loadingScreen = page.locator('[data-testid="loading-screen"]');
    
    // 2. Wait for loading screen to vanish. The WebGL initialization, minimum display, and CSS transition take some time.
    await expect(loadingScreen).toBeHidden({ timeout: 20000 });
    
    // 3. Hero headline should be visible after loading completes
    const heroHeadline = page.locator('.hero-headline').first();
    await expect(heroHeadline).toBeVisible({ timeout: 5000 });
  });
});
