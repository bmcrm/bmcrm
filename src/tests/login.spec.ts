import { test, expect } from '@playwright/test';
import { EnvConfigs } from 'shared/config/env/env';

test('successful login', async ({ page }) => {
  await page.goto('https://app.dev.bmcrm.camp/login');
  await page.fill('input[name="email"]', EnvConfigs.TEST_ACCOUNT_TCO_EMAIL);
  await page.fill('input[name="password"]', EnvConfigs.TEST_ACCOUNT_TCO_PASSWORD);
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('https://app.dev.bmcrm.camp/login');
  await expect(page.locator('text=Leads')).toBeVisible();
});
