import { expect, test } from '@playwright/test';
import {
	fillInventoryForm,
	getTestParameters,
	getURLs,
	login,
	customWaitForResponse,
	DataType,
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

test.describe('Check inventory page, create, edit and remove inventory item', () => {

	test.beforeAll(async () => {
		TEST_PARAMS = await getTestParameters();
		URLS = await getURLs(TEST_PARAMS.CAMP_ID);
	});

	test('Login, then create, edit and remove inventory item', async ({ page }) => {
		await login(page, URLS, TEST_PARAMS);

		await page.goto(URLS.INVENTORY);
		await expect(page).toHaveURL(URLS.INVENTORY);

		const addItemButton = page.locator('button', { hasText: 'Add inventory' });
		await expect(addItemButton).toBeVisible();
		await addItemButton.click();

		const form = page.locator('form');
		await expect(form).toBeVisible();

		await page.waitForTimeout(1000);
		await fillInventoryForm({ page, stage: 'create', dataType: DataType.FUZZ });
		await customWaitForResponse({ page, endpoint: '/inventory' });
		await page.waitForTimeout(1000);
		await expect(page.locator('text=Item created successfully!')).toBeVisible();

		const editItemButton = page.locator('button[aria-label="Edit item button"]').first();
		await expect(editItemButton).toBeVisible();
		await editItemButton.click();
		await expect(form).toBeVisible();

		await page.waitForTimeout(1000);
		await fillInventoryForm({ page, stage: 'edit', dataType: DataType.FUZZ });
		await customWaitForResponse({ page, endpoint: '/inventory' });
		await page.waitForTimeout(1000);
		await expect(page.locator('text=Item updated successfully!')).toBeVisible();

		await page.keyboard.press('Escape');

		await page.locator('button[aria-label="Delete item button"]').first().click();
		const confirmDeleteButton = page.locator('button', { hasText: 'YES, DELETE' });
		await expect(confirmDeleteButton).toBeVisible();
		await confirmDeleteButton.click();
		await customWaitForResponse({ page, endpoint: '/inventory' });
		await expect(page.locator('text=Item successfully removed')).toBeVisible();
		await page.waitForTimeout(500);
	});
});