import { test, expect } from '@playwright/test';
import {
  deleteUser,
  generateFuzzData,
  generateFakeData,
  getParameter,
  getTestParameters,
  getURLs,
  login,
} from '@shared/tests/utils/utils';
import { createSlug } from '@shared/lib/createSlug';

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

  test('Fuzz registration from registration page', async ({ page }) => {
    await page.goto(URLS.REGISTER);

    const { campName, city, firstName, lastName, playaName, email } = generateFuzzData();
    const { password } = generateFakeData();

    await page.fill('input[name="camp_name"]', campName);
    await page.fill('input[name="city"]', city);
    await page.fill('input[name="first_name"]', firstName);
    await page.fill('input[name="last_name"]', lastName);
    await page.fill('input[name="playa_name"]', playaName);
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', password);
    await page.click('label[aria-label="Accept terms"]');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(2000);

    await expect(page.locator('text=Account Verification')).toBeVisible();

    await deleteUser({
      cognitoPoolId: TEST_PARAMS.TEST_COGNITO_POOL_ID,
      email,
      campID: createSlug(campName.replace(/\s+/g, '-')),
      tableName: CAMPERS_TABLE,
    });
  });

  test('successful login', async ({ page }) => {
    await login(page, URLS, TEST_PARAMS);
  });
});
