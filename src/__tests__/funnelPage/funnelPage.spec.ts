import { expect, test } from '@playwright/test';
import {
	getTestParameters,
	getURLs,
	login,
	fillCamperDetailsForm,
	resetCamperDetailsForm,
	customWaitForResponse,
} from '@shared/tests/utils/utils';

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

test.describe.skip('Check funnel page and edit user', () => {

	test.beforeAll(async () => {
		TEST_PARAMS = await getTestParameters();
		URLS = await getURLs(TEST_PARAMS.CAMP_ID);
	});

	test('Login and edit user', async ({ page }) => {
		await login(page, URLS, TEST_PARAMS);

		await page.goto(URLS.FUNNEL);
		await expect(page).toHaveURL(URLS.FUNNEL);

		const userItem = page.locator('li', { hasText: 'Test User' });
		await expect(userItem).toBeVisible();
		await userItem.click();

		const emailLink = page.locator('a', { hasText: 'fake@example.com' });
		await expect(emailLink).toBeVisible();

		const editButton = page.locator('button[aria-label="Edit details button"]');
		await expect(editButton).toBeVisible();
		await editButton.click();

		const form = page.locator('form');
		await expect(form).toBeVisible();

		await fillCamperDetailsForm(page);
		await customWaitForResponse({ page, endpoint: '/campers' });
		await page.waitForTimeout(500);

		await editButton.click();
		await expect(form).toBeVisible();

		await resetCamperDetailsForm(page);
		await customWaitForResponse({ page, endpoint: '/campers' });
		await page.waitForTimeout(500);

		await expect(page.locator('text=fakeTown')).toBeVisible();

		await page.keyboard.press('Escape');

		await expect(userItem).toBeVisible();
	});
});