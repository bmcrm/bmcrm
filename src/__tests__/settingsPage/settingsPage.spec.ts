import { expect, test } from '@playwright/test';
import {
	getTestParameters,
	getURLs,
	login,
	fillSettingsAccountForm,
	resetSettingsAccountForm,
	fillSettingsCampForm,
	resetSettingsCampForm,
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

		await page.waitForTimeout(1000);

		await resetSettingsAccountForm(page);

		await expect(page.locator('input[name="first_name"]')).toHaveValue(defaultUserData.firstName);
		await expect(page.locator('input[name="last_name"]')).toHaveValue(defaultUserData.lastName);
		await expect(page.locator('input[name="playa_name"]')).toHaveValue(defaultUserData.playaName);
		await expect(page.locator('input[name="city"]')).toHaveValue(defaultUserData.city);

		await page.waitForResponse((response) =>
			response.url().includes('/campers') &&
			['GET', 'PATCH'].includes(response.request().method()) &&
			response.status() === 200
		);
	});

	test('Login and edit camp', async ({ page }) => {
		await login(page, URLS, TEST_PARAMS);

		await page.goto(URLS.SETTINGS_CAMP);
		await expect(page).toHaveURL(URLS.SETTINGS_CAMP);

		await fillSettingsCampForm(page);

		await resetSettingsCampForm(page);

		await expect(page.locator('input[name="camp_name"]')).toHaveValue(defaultCampData.name);
		await expect(page.locator('input[name="city"]')).toHaveValue(defaultCampData.city);
		await expect(page.locator('input[name="camp_website"]')).toHaveValue(defaultCampData.link);

		await page.waitForResponse((response) =>
			response.url().includes('/camps') &&
			['GET', 'PATCH'].includes(response.request().method()) &&
			response.status() === 200
		);
	});
});