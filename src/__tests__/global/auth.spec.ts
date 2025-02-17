import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
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
    const fakeCampName = faker.word.words({ count: { min: 1, max: 3 } }).replace(/\s+/g, '-');
    const fakeCity = faker.location.city();
    const fakeFirstName = faker.person.firstName();
    const fakeLastName = faker.person.lastName();
    const fakePlayaName = faker.internet.username();
    const fakeEmail = faker.internet.email();
    const fakePassword = faker.string.alphanumeric(6) +
      faker.string.numeric(1) +
      faker.string.symbol(1) +
      faker.string.alpha(1).toUpperCase();

    await page.goto(URLS.REGISTER_URL);
    await page.fill('input[name="camp_name"]', fakeCampName);
    await page.fill('input[name="city"]', fakeCity);
    await page.fill('input[name="first_name"]', fakeFirstName);
    await page.fill('input[name="last_name"]', fakeLastName);
    await page.fill('input[name="playa_name"]', fakePlayaName);
    await page.fill('input[name="email"]', fakeEmail);
    await page.fill('input[name="password"]', fakePassword);
    await page.click('label[aria-label="Accept terms"]');
    await page.click('button[type="submit"]');
    await expect(page.locator('text=Account Verification')).toBeVisible();
    await deleteUser({
      cognitoPoolId: TEST_PARAMS.TEST_COGNITO_POOL_ID,
      email: fakeEmail,
      campID: fakeCampName,
      tableName: CAMPERS_TABLE,
    });
  });

  test('successful login', async ({ page }) => {
    await login(page, URLS, TEST_PARAMS);
  });
});
