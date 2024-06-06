// tests/login.spec.ts
import { test, expect } from '@playwright/test';

test('successful login', async ({ page }) => {
  await page.goto('https://app.dev.bmcrm.camp/login');
  await page.fill('input[name="email"]', 's.drynkin@karmafixer.com');
  await page.fill('input[name="password"]', '123qweasdQ!');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('https://app.dev.bmcrm.camp/login');
  await expect(page.locator('text=Leads')).toBeVisible();
});
