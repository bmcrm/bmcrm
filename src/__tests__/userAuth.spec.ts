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
  const [
    TEST_COGNITO_POOL_ID_RES,
    COGNITO_APP_CLIENT_ID_RES,
    TEST_EMAIL_RES,
    CAMP_ID_RES,
    TEMP_PASSWORD_RES,
    NEW_PASSWORD_RES,
    USER_ROLE_RES,
    TABLE_NAME_RES,
  ] = await Promise.all([
    getParameter('/campers/cognito_user_pool_id'),
    getParameter('/campers/cognito_client_pool_id'),
    getParameter('/webapp/test/email'),
    getParameter('/webapp/test/account_camp_id'),
    getParameter('/webapp/test/password_temp'),
    getParameter('/webapp/test/password_new'),
    getParameter('/webapp/test/user_role'),
    getParameter('/campers/ddb_table_name'),
  ]);

  TEST_COGNITO_POOL_ID = TEST_COGNITO_POOL_ID_RES;
  COGNITO_APP_CLIENT_ID = COGNITO_APP_CLIENT_ID_RES;
  TEST_EMAIL = TEST_EMAIL_RES;
  CAMP_ID = CAMP_ID_RES;
  TEMP_PASSWORD = TEMP_PASSWORD_RES;
  NEW_PASSWORD = NEW_PASSWORD_RES;
  USER_ROLE = USER_ROLE_RES;
  TABLE_NAME = TABLE_NAME_RES;

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

//TODO: fix test
// test('successful login and show details modal, edit and save user data, close details modal', async ({ page }) => {
//   await page.fill('input[name="email"]', TEST_EMAIL);
//   await page.fill('input[name="password"]', NEW_PASSWORD);
//   await page.click('button[type="submit"]');
//   await expect(page).toHaveURL(FUNNEL_URL);
//   const element = await page.locator('text=fake@example.com').nth(1);
//   await element.hover();
//   await element.click();
//   await expect(page.locator('text=About Me')).toBeVisible();
//   await expect(page.locator('text=Campers Notes')).toBeVisible();
//   await expect(page.locator('textarea[name="about_me"]')).toBeVisible();
//   await expect(page.locator('textarea[name="history.0.value"]')).toBeVisible();
//   await page.locator('textarea[name="about_me"]').fill('my new about me');
//   await page.locator('textarea[name="history.0.value"]').fill('my new note');
//   await expect(page.locator('textarea[name="about_me"]')).toHaveValue('my new about me');
//   await expect(page.locator('textarea[name="history.0.value"]')).toHaveValue('my new note');
//   const addSocialBtn = page.locator('._btn_ii6bv_56');

//   if (await addSocialBtn.isVisible()) {
//     await addSocialBtn.click();
//     await expect(page.locator('text=Add Social Media Link')).toBeVisible();
//     await page.fill('input[name="url"]', 'https://x.com/test-user');
//     await page.getByRole('button', { name: 'add' }).click();
//     const link = page.locator('a[href="https://x.com/test-user"]');
//     await expect(link).toBeVisible();
//     const removeSocialBtn = page.locator('._btn-remove_14bmx_18');
//     await removeSocialBtn.click();
//     await page.waitForSelector('a[href="https://x.com/test-user"]', { state: 'detached' });
//     const isLinkVisible = await link.isVisible().catch(() => false);
//     expect(isLinkVisible).toBe(false);
//   }

//   await page.getByRole('button', { name: 'save' }).click();
//   await expect(page.locator('text=my new about me')).toBeVisible();
//   await expect(page.locator('text=my new note')).toBeVisible();
//   await page.press('body', 'Escape');
//   await page.waitForTimeout(3000);
// });

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
  await expect(page.getByRole('heading', { name: 'Reset Password' })).toBeVisible();
  await page.fill('input[name="email"]', 'incorrect_email@example.com');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL(RESET_URL);
  await expect(
    page.locator('text=/(Oops, something went wrong! Try again later!|User does not exist!)/')
  ).toBeVisible();
});
