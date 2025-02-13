import { test, expect } from '@playwright/test';
import { deleteUser, getParameter, getTestParameters, getURLs, login } from '@shared/tests/utils/utils';

let URLS: Record<string, string>;
let TEST_PARAMS: {
  TEST_COGNITO_POOL_ID: string;
  COGNITO_APP_CLIENT_ID: string;
  TEST_EMAIL: string;
  TEMP_PASSWORD: string;
  NEW_PASSWORD: string;
};
let CAMPERS_TABLE: string;

test.describe('Testing login and register flow', () => {

  test.beforeAll(async () => {
    [
      URLS,
      TEST_PARAMS,
      CAMPERS_TABLE,
    ] = await Promise.all([
      getURLs(),
      getTestParameters(),
      getParameter('/campers/ddb_table_name'),
    ]);
  });

  test('successful register', async ({ page }) => {
    await page.goto(URLS.REGISTER_URL);
    await page.fill('input[name="camp_name"]', 'fake-camp-test');
    await page.fill('input[name="city"]', 'city');
    await page.fill('input[name="first_name"]', 'first name');
    await page.fill('input[name="last_name"]', 'last_name');
    await page.fill('input[name="playa_name"]', 'playa name');
    await page.fill('input[name="email"]', 'fake@email.com');
    await page.fill('input[name="password"]', 'Password1!');
    await page.click('label[aria-label="Accept terms"]');
    await page.click('button[type="submit"]');
    await expect(page.locator('h1')).toHaveText('Account Verification');
    await deleteUser({
      cognitoPoolId: TEST_PARAMS.TEST_COGNITO_POOL_ID,
      email: 'fake@email.com',
      campID: 'fake-camp-test',
      tableName: CAMPERS_TABLE,
    });
  });

  test('successful login', async ({ page }) => {
    await login(page, URLS, TEST_PARAMS);
  });
});
