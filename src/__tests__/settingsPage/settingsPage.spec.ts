import { expect, test } from '@playwright/test';
import {
	getTestParameters,
	getURLs,
	login,
	fillSettingsAccountForm,
	resetSettingsAccountForm,
	fillSettingsCampForm,
	resetSettingsCampForm,
	customWaitForResponse,
	defaultUserData,
	defaultCampData,
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

test.describe('Check settings page, edit camper and camp forms', () => {

	test.beforeAll(async () => {
		TEST_PARAMS = await getTestParameters();
		URLS = await getURLs(TEST_PARAMS.CAMP_ID);
	});

	test('Login and edit camper', async ({ page }) => {
		await login(page, URLS, TEST_PARAMS);
		await page.goto(URLS.SETTINGS_ACCOUNT);
		await expect(page).toHaveURL(URLS.SETTINGS_ACCOUNT);

		await fillSettingsAccountForm(page);
		await customWaitForResponse({ page, endpoint: '/campers' });

		await page.waitForTimeout(1500);
		await resetSettingsAccountForm(page);
		await customWaitForResponse({ page, endpoint: '/campers' });

		const firstNameInput = page.locator('input[name="first_name"]');

		await expect(firstNameInput).toHaveValue(defaultUserData.firstName, { timeout: 10000 });

		await expect(page.locator('input[name="last_name"]')).toHaveValue(defaultUserData.lastName);
		await expect(page.locator('input[name="playa_name"]')).toHaveValue(defaultUserData.playaName);
		await expect(page.locator('input[name="city"]')).toHaveValue(defaultUserData.city);
	});

	test('Login and edit camp', async ({ page }) => {
		await login(page, URLS, TEST_PARAMS);
		await page.goto(URLS.SETTINGS_CAMP);
		await expect(page).toHaveURL(URLS.SETTINGS_CAMP);

		await fillSettingsCampForm(page);
		await customWaitForResponse({ page, endpoint: '/camps' });
		await page.waitForTimeout(500);

		await resetSettingsCampForm(page);
		await customWaitForResponse({ page, endpoint: '/camps' });
		await page.waitForTimeout(500);

		await expect(page.locator('input[name="camp_name"]')).toHaveValue(defaultCampData.name);
		await expect(page.locator('input[name="city"]')).toHaveValue(defaultCampData.city);
		await expect(page.locator('input[name="camp_website"]')).toHaveValue(defaultCampData.link);
	});
});