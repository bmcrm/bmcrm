import { test, expect } from '@playwright/test';
import { deleteUser, getTestParameters, getURLs, login } from '@shared/tests/utils/utils';

let TEST_PARAMS: {
  TEST_COGNITO_POOL_ID: string;
  COGNITO_APP_CLIENT_ID: string;
  TEST_EMAIL: string;
  TEMP_PASSWORD: string;
  NEW_PASSWORD: string;
};
let URLS: Record<string, string>;

test.describe('Testing login and register flow', () => {

  test.beforeAll(async () => {
    TEST_PARAMS = await getTestParameters();
    URLS = await getURLs();
  });

  test.skip('successful register', async ({ page }) => {
    await page.goto(URLS.REGISTER_URL);
    await page.fill('input[name="name"]', 'First Name');
    await page.fill('input[name="SOID"]', 'mySOID');
    await page.fill('input[name="email"]', 'test_email@test.com');
    await page.fill('input[name="password"]', 'Password1!');
    await page.click('button[type="submit"]');
    await expect(page.locator('h1')).toHaveText('Confirmation');
    await deleteUser(TEST_PARAMS.TEST_COGNITO_POOL_ID, 'test_email@test.com');
  });

  test('successful login', async ({ page }) => {
    await login(page, URLS, TEST_PARAMS);
  });
});
