import { expect, test } from '@playwright/test';
import {
	getTestParameters,
	getURLs,
	login,
	createFakeShiftsForm,
	editFakeShiftsForm,
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

test.describe('Check shifts page, create, edit and remove shift', () => {

	test.beforeAll(async () => {
		TEST_PARAMS = await getTestParameters();
		URLS = await getURLs(TEST_PARAMS.CAMP_ID);
	});

	test('Login, then create, edit and remove shift', async ({ page }) => {
		await login(page, URLS, TEST_PARAMS);

		await page.goto(URLS.SHIFTS);
		await expect(page).toHaveURL(URLS.SHIFTS);

		const addShiftButton = page.locator('button', { hasText: 'Add new' });
		await expect(addShiftButton).toBeVisible();
		await addShiftButton.click();

		const form = page.locator('form');
		await expect(form).toBeVisible();

		await createFakeShiftsForm(page);
		await expect(page.locator('text=Shift created successfully!')).toBeVisible();

		const editShiftButton = page.locator('button', { hasText: 'Edit' });
		await expect(editShiftButton).toBeVisible();
		await editShiftButton.click();

		await expect(form).toBeVisible();

		await editFakeShiftsForm(page);

		await page.locator('button[aria-label="Delete shift button"]').click();
		await expect(page.locator('text=Shift successfully removed')).toBeVisible();

		await page.waitForResponse((response) =>
			response.url().includes('/shifts') &&
			['GET', 'PUT', 'DELETE'].includes(response.request().method()) &&
			(response.status() === 200 || response.status() === 204)
		);
	});
});