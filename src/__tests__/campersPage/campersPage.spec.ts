import { expect, test } from '@playwright/test';
import {
	getTestParameters,
	getURLs,
	login,
	fillCamperDetailsForm,
	resetCamperDetailsForm,
	fillCreateCamperForm,
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

test.describe('Check campers page and edit user', () => {

	test.beforeAll(async () => {
		TEST_PARAMS = await getTestParameters();
		URLS = await getURLs(TEST_PARAMS.CAMP_ID);
	});

	test('Login and edit user', async ({ page }) => {
		await login(page, URLS, TEST_PARAMS);

		await page.goto(URLS.CAMPERS);
		await expect(page).toHaveURL(URLS.CAMPERS);

		const editCamperButton = page.locator('button[aria-label="Edit camper button"]');
		await expect(editCamperButton).toBeVisible();
		await editCamperButton.click();

		const form = page.locator('form');
		await expect(form).toBeVisible();

		await fillCamperDetailsForm(page);
		await customWaitForResponse({ page, endpoint: '/campers' });
		await page.waitForTimeout(500);

		const emailLink = page.locator('a[aria-label="Camper email"]');
		await expect(emailLink).toBeVisible();

		const editCamperInnerButton = page.locator('button[aria-label="Edit details button"]');
		await expect(editCamperInnerButton).toBeVisible();
		await editCamperInnerButton.click();

		await expect(form).toBeVisible();

		await resetCamperDetailsForm(page);
		await customWaitForResponse({ page, endpoint: '/campers' });
		await page.waitForTimeout(500);

		await expect(page.locator('li', { hasText: 'fakeTown' })).toBeVisible();

		await page.keyboard.press('Escape');

		await expect(page.locator('text=Test User')).toBeVisible();
	});

	test('Login, create and delete camper', async ({ page }) => {
		await login(page, URLS, TEST_PARAMS);

		await page.goto(URLS.CAMPERS);
		await expect(page).toHaveURL(URLS.CAMPERS);

		const createCamperButton = page.locator('button', { hasText: 'Create' });
		await expect(createCamperButton).toBeVisible();
		await createCamperButton.click();

		const form = page.locator('form');
		await expect(form).toBeVisible();

		await fillCreateCamperForm(page);
		await customWaitForResponse({ page, endpoint: '/campers' });
		await page.waitForTimeout(500);

		await expect(page.locator('td', { hasText: 'prospect' })).toBeVisible();

		const deleteCamperButton = page.locator('button[aria-label="Delete camper button"]');
		await expect(deleteCamperButton).toBeVisible();
		await deleteCamperButton.click();
		const confirmDeleteButton = page.locator('button', { hasText: 'YES, DELETE' });
		await expect(confirmDeleteButton).toBeVisible();
		await confirmDeleteButton.click();

		await customWaitForResponse({ page, endpoint: '/campers' });
		await page.waitForTimeout(500);

		await expect(page.locator('td', { hasText: 'prospect' })).toHaveCount(0);
	});
});