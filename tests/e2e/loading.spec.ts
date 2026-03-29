import { test, expect } from '@playwright/test';

test.describe('Loading Screen Flow', () => {
  test('loading screen masks content and sequences animations correctly', async ({ page }) => {
    // Navigate to homepage, wait only for domcontentloaded so we can catch the loading screen before it vanishes
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    // 1. Loading screen should be visible initially
    const loadingScreen = page.locator('text=Initializing Environment');
    await expect(loadingScreen).toBeVisible();

    // 2. Check accessibility attribute on body
    await expect(page.locator('body')).toHaveAttribute('aria-busy', 'true');

    // 3. Wait for loading screen to vanish. The WebGL initialization and CSS transition takes some time.
    await expect(loadingScreen).toBeHidden({ timeout: 15000 });
    
    // The body should no longer have aria-busy="true"
    await expect(page.locator('body')).not.toHaveAttribute('aria-busy', 'true');

    // 4. Hero text animation should have started and eventually finish
    const firstHeroWord = page.locator('.hero-word').first();
    await expect(firstHeroWord).toHaveCSS('opacity', '1', { timeout: 5000 });
  });
});
