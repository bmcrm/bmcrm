import { test, expect } from '@playwright/test';
import { getParameter, createUser, initiateAuth, deleteUser } from './testUtils';

const LOGIN_URL = 'https://app.dev.bmcrm.camp/login';
const FUNNEL_URL = 'https://app.dev.bmcrm.camp/funnel';
const RESET_URL = 'https://app.dev.bmcrm.camp/reset-password';

let TEST_COGNITO_POOL_ID: string;
let COGNITO_APP_CLIENT_ID: string;
let TEST_EMAIL: string;
let CAMP_ID: string;
let TEMP_PASSWORD: string;
let NEW_PASSWORD: string;
let USER_ROLE: string;
let TABLE_NAME: string;

test.beforeAll(async () => {
  TEST_COGNITO_POOL_ID = await getParameter('/fetchCampers/cognito_user_pool_id');
  COGNITO_APP_CLIENT_ID = await getParameter('/fetchCampers/cognito_client_pool_id');
  TEST_EMAIL = await getParameter('/webapp/test/email');
  CAMP_ID = await getParameter('/webapp/test/account_camp_id');
  TEMP_PASSWORD = await getParameter('/webapp/test/password_temp');
  NEW_PASSWORD = await getParameter('/webapp/test/password_new');
  USER_ROLE = await getParameter('/webapp/test/user_role');
  TABLE_NAME = await getParameter('/fetchCampers/ddb_table_name');

  await createUser(TEST_COGNITO_POOL_ID, TEST_EMAIL, CAMP_ID, TEMP_PASSWORD, USER_ROLE);
  await initiateAuth(TEST_COGNITO_POOL_ID, COGNITO_APP_CLIENT_ID, TEST_EMAIL, TEMP_PASSWORD, NEW_PASSWORD);
});

test.afterAll(async () => {
  await deleteUser(TEST_COGNITO_POOL_ID, TEST_EMAIL, CAMP_ID, TABLE_NAME);
});

test.beforeEach(async ({ page }) => {
  await page.goto(LOGIN_URL);
});

test.afterEach(async ({ page }) => {
  await page.goto(LOGIN_URL);
});

test('successful login', async ({ page }) => {
  await page.fill('input[name="email"]', TEST_EMAIL);
  await page.fill('input[name="password"]', NEW_PASSWORD);
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL(FUNNEL_URL);
  await expect(page.locator('text=Invite')).toBeVisible();
});
test('successful login and show modal info', async ({ page }) => {
  await page.fill('input[name="email"]', TEST_EMAIL);
  await page.fill('input[name="password"]', NEW_PASSWORD);
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL(FUNNEL_URL);
  await expect(page.locator('text=Invite')).toBeVisible();
  const element = await page.locator('text=fake@example.com').nth(1);
  await element.hover();
  await element.click();
  await expect(page.locator('text=Summary')).toBeVisible();
  await page.getByRole('button').nth(1).click();
  await page.getByRole('button', { name: 'cancel' }).click();
  await page.press('body', 'Escape');
  await page.waitForTimeout(3000);
});

test('unsuccessful login with incorrect credentials', async ({ page }) => {
  await page.fill('input[name="email"]', 'incorrect_email@example.com');
  await page.fill('input[name="password"]', NEW_PASSWORD);
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL(LOGIN_URL);
  await expect(page.locator('text=User does not exist')).toBeVisible();
});

test('unsuccessful login without providing credentials', async ({ page }) => {
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL(LOGIN_URL);
  await expect(page.locator('text=Email is required')).toBeVisible();
});
test('successful logout', async ({ page }) => {
  await page.fill('input[name="email"]', TEST_EMAIL);
  await page.fill('input[name="password"]', NEW_PASSWORD);
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL(FUNNEL_URL);
  const element = await page.getByRole('heading', { name: 'Fake@example.com' });
  await element.hover();
  const logoutBtn = await page.locator('text=Log Out');
  await logoutBtn.click();
  await expect(page).toHaveURL(LOGIN_URL);
});

test('forgot password unsuccessful', async ({ page }) => {
  await page.goto(LOGIN_URL);
  await page.fill('input[name="email"]', TEST_EMAIL);
  await page.locator('text=Forgot Password?').click();
  await expect(page).toHaveURL(RESET_URL);
  await expect(page.locator('text=Forgot Password')).toBeVisible();
  await page.fill('input[name="email"]', 'incorrect_email@example.com');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL(RESET_URL);
  await expect(
    page.locator('text=/(Oops, something went wrong! Try again later!|User does not exist!)/')
  ).toBeVisible();
});
