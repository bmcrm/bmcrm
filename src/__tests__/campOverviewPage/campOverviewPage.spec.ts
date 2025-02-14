import { expect, test } from '@playwright/test';
import { getTestParameters, getURLs, login } from '@shared/tests/utils/utils';

let URLS: Record<string, string>;
let TEST_PARAMS: {
	TEST_COGNITO_POOL_ID: string;
	COGNITO_APP_CLIENT_ID: string;
	TEST_EMAIL: string;
	TEMP_PASSWORD: string;
	NEW_PASSWORD: string;
	CAMP_ID: string;
};

test.describe('Check camp overview page', () => {

	test.beforeAll(async () => {
		TEST_PARAMS = await getTestParameters();
		URLS = await getURLs(TEST_PARAMS.CAMP_ID);
	});

	test('Login and redirect to camp overview page', async ({ page }) => {
		await login(page, URLS, TEST_PARAMS);

		await page.goto(URLS.CAMP_OVERVIEW_URL);

		await expect(page).toHaveURL(URLS.CAMP_OVERVIEW_URL);
		await expect(page.locator('text=camp for tests')).toBeVisible();
	});
});