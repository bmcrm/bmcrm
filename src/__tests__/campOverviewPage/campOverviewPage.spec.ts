import { expect, test } from '@playwright/test';
import { generateFakeData, generateFuzzData, getTestParameters, getURLs, login } from '@shared/tests/utils/utils';

let URLS: Record<string, string>;
let TEST_PARAMS: {
	TEST_COGNITO_POOL_ID: string;
	COGNITO_APP_CLIENT_ID: string;
	TEST_EMAIL: string;
	TEMP_PASSWORD: string;
	NEW_PASSWORD: string;
	CAMP_ID: string;
	APP_URL: string;
};

test.describe('Check camp overview page', () => {

	test.beforeAll(async () => {
		TEST_PARAMS = await getTestParameters();
		URLS = await getURLs(TEST_PARAMS.CAMP_ID);
	});

	test('Login and redirect to camp overview page', async ({ page }) => {
		await login(page, URLS, TEST_PARAMS);

		await page.goto(URLS.CAMP_OVERVIEW);

		await expect(page).toHaveURL(URLS.CAMP_OVERVIEW);
		await expect(page.locator('text=camp for tests')).toBeVisible();
	});

	test('Fuzz registration from the camp page', async ({ page }) => {
		await page.route('**/campers/create**', route => route.abort());

		const { firstName, lastName, playaName, summary, email } = generateFuzzData();
		const { password } = generateFakeData();

		await page.goto(URLS.CAMP_OVERVIEW);

		await expect(page).toHaveURL(URLS.CAMP_OVERVIEW, { timeout: 15000 });

		const campTitle = page.locator('text=/camp for tests/i');
		await expect(campTitle).toBeVisible({ timeout: 15000 });

		await page.locator('input[name="playa_name"]').waitFor({ state: 'visible' });

		await page.fill('input[name="playa_name"]', playaName);
		await page.fill('input[name="first_name"]', firstName);
		await page.fill('input[name="last_name"]', lastName);
		await page.fill('textarea[name="about_me"]', summary);
		await page.fill('input[name="email"]', email);
		await page.fill('input[name="password"]', password);

		await page.locator('button[aria-label="Toggle tooltip button"]').click();
		const addSocialButton = page.locator('button:has-text("Add link")');

		await expect(addSocialButton).toBeVisible({ timeout: 10000 });
		await addSocialButton.click();

		await page.selectOption('select[name="socials.0.socialName"]', 'facebook');
		await page.fill('input[name="socials.0.userName"]', 'testFacebook');

		await page.locator('select[name="socials.1.socialName"]').waitFor({ state: 'attached' });
		await page.selectOption('select[name="socials.1.socialName"]', 'instagram');
		await page.fill('input[name="socials.1.userName"]', 'testInstagram');

		await page.click('label[aria-label="Accept terms"]');
		await page.click('button[type="submit"]');


		await page.waitForLoadState('networkidle');

		await expect(page).toHaveURL(URLS.CAMP_OVERVIEW);
		await expect(page.locator('[aria-label="Error message"]')).not.toBeVisible({ timeout: 5000 });
	});
});