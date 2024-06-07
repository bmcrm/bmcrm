import { test, expect } from '@playwright/test';
import { SSMClient, GetParameterCommand } from '@aws-sdk/client-ssm';

// Initialize AWS SSM client to pull login credentials of the testuser
const client = new SSMClient({ region: 'us-east-1' });
function getParameter(name: string): Promise<string> {
  const resp = client.send(new GetParameterCommand({ Name: name }));
  return resp.then(r => r.Parameter?.Value || '');
}

const LOGIN_URL = 'https://app.dev.bmcrm.camp/funnel';
const RESET_URL = 'https://app.dev.bmcrm.camp/reset-password';

// we have separate test account for a TCO persona and a Camper persona
const TEST_ACCOUNT_TCO_EMAIL = await getParameter('/webapp/test/tco_email');
const TEST_ACCOUNT_TCO_PASSWORD = await getParameter('/webapp/test/tco_password');

test('successful login', async ({ page }) => {
  await page.goto(LOGIN_URL);
  await page.fill('input[name="email"]', TEST_ACCOUNT_TCO_EMAIL);
  await page.fill('input[name="password"]', TEST_ACCOUNT_TCO_PASSWORD);
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL(LOGIN_URL);
  await expect(page.locator('text=Invite')).toBeVisible();
});
test('unsuccessful login with incorrect credentials', async ({ page }) => {
  await page.goto(LOGIN_URL);
  await page.fill('input[name="email"]', 'incorrect_email@example.com');
  await page.fill('input[name="password"]', TEST_ACCOUNT_TCO_PASSWORD);
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL(LOGIN_URL);
  await expect(page.locator('text=User does not exist')).toBeVisible();
});
test('unsuccessful login without providing credentials', async ({ page }) => {
  await page.goto(LOGIN_URL);
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL(LOGIN_URL);
  await expect(page.locator('text=Email is required')).toBeVisible();
});
test('successful logout', async ({ page }) => {
  await page.goto(LOGIN_URL);
  await page.fill('input[name="email"]', TEST_ACCOUNT_TCO_EMAIL);
  await page.fill('input[name="password"]', TEST_ACCOUNT_TCO_PASSWORD);
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL(LOGIN_URL);
  const element = await page.locator('text=Alex Roman');
  await element.hover();
  const logoutBtn = await page.locator('text=Log Out');
  await logoutBtn.click();
  await expect(page).toHaveURL(LOGIN_URL);
});
test('forgot password unsuccessful', async ({ page }) => {
  await page.goto(LOGIN_URL);
  await page.fill('input[name="email"]', TEST_ACCOUNT_TCO_EMAIL);
  await page.locator('text=Forgot Password?').click();
  await expect(page).toHaveURL(RESET_URL);
  await expect(page.locator('text=Forgot Password')).toBeVisible();
  await page.fill('input[name="email"]', 'incorrect_email@example.com');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL(RESET_URL);
  await expect(page.locator('text=This email was not found!')).toBeVisible();
});
