import { expect, test } from '@playwright/test';
import {
	getTestParameters,
	getURLs,
	login,
	fillCamperDetailsForm,
	resetCamperDetailsForm,
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

test.describe('Check campers page and edit user', () => {

	test.beforeAll(async () => {
		TEST_PARAMS = await getTestParameters();
		URLS = await getURLs(TEST_PARAMS.CAMP_ID);
	});

	test('Login and edit user', async ({ page }) => {
		await login(page, URLS, TEST_PARAMS);

		await page.goto(URLS.CAMPERS);
		await expect(page).toHaveURL(URLS.CAMPERS);

		const editCamperButton = page.locator('button', { hasText: 'Edit' });
		await expect(editCamperButton).toBeVisible();
		await editCamperButton.click();

		const form = page.locator('form');
		await expect(form).toBeVisible();

		await fillCamperDetailsForm(page);

		const emailLink = page.locator('a[aria-label="Camper email"]');
		await expect(emailLink).toBeVisible();

		const editCamperInnerButton = page.locator('button[aria-label="Edit details button"]');
		await expect(editCamperInnerButton).toBeVisible();
		await editCamperInnerButton.click();

		await expect(form).toBeVisible();

		await resetCamperDetailsForm(page);

		await expect(page.locator('li', { hasText: 'fakeTown' })).toBeVisible();

		await page.keyboard.press('Escape');

		await expect(page.locator('text=Test User')).toBeVisible();

		await page.waitForResponse((response) =>
			response.url().includes('/campers') && response.request().method() === 'PATCH' && response.status() === 200
		);
	});
});