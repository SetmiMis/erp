import { test, expect } from '@playwright/test';

test('dashboard page', async ({ page }) => {
  await page.goto('/dashboard');
  await page.waitForURL('/dashboard');
  await expect(page.locator('h1')).toContainText('Dashboard');
});
