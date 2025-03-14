import { expect, test } from '@playwright/test';
import {
	getTestParameters,
	getURLs,
	login,
	customWaitForResponse,
	fillCalendarEventForm,
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

test.describe('Create, edit and remove calendar event on dashboard page', () => {

	test.beforeAll(async () => {
		TEST_PARAMS = await getTestParameters();
		URLS = await getURLs(TEST_PARAMS.CAMP_ID);
	});

	test('Login, then create, edit and remove calendar event', async ({ page }) => {
		await login(page, URLS, TEST_PARAMS);

		await page.goto(URLS.DASHBOARD);
		await expect(page).toHaveURL(URLS.DASHBOARD);

		const addEventButton = page.locator('button', { hasText: 'Add event' });
		await expect(addEventButton).toBeVisible();
		await addEventButton.click();

		const form = page.locator('form');
		await expect(form).toBeVisible();

		await page.waitForTimeout(1000);
		await fillCalendarEventForm({ page, date: 'today' });
		await customWaitForResponse({ page, endpoint: '/calendar' });
		await page.waitForTimeout(1000);

		const eventsList = page.locator('ul[aria-label="events list"]');
		await expect(eventsList).toBeVisible();
		await eventsList.hover();
		const editEventButton = page.locator('span[aria-label="edit event button"]');
		await expect(editEventButton).toBeVisible();
		await editEventButton.click();
		await expect(form).toBeVisible();

		await page.waitForTimeout(1000);
		await fillCalendarEventForm({ page, date: 'tomorrow' });
		await customWaitForResponse({ page, endpoint: '/calendar' });
		await page.waitForTimeout(1000);

		await eventsList.hover();
		const deleteEventButton = page.locator('span[aria-label="delete event button"]');
		await expect(deleteEventButton).toBeVisible();
		await deleteEventButton.click();
		await customWaitForResponse({ page, endpoint: '/calendar' });
		await page.waitForTimeout(500);
		await expect(page.locator('text=Event successfully removed')).toBeVisible();
		await page.waitForTimeout(500);
	});
});