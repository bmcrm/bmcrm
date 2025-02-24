import { expect, test } from '@playwright/test';
import { fillInventoryForm, getTestParameters, getURLs, login, DataType } from '@shared/tests/utils/utils';

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

		const addItemButton = page.locator('button', { hasText: 'Add!' });
		await expect(addItemButton).toBeVisible();
		await addItemButton.click();

		const form = page.locator('form');
		await expect(form).toBeVisible();

		await fillInventoryForm({ page, stage: 'create', dataType: DataType.FAKE });
		await expect(page.locator('text=Item created successfully!')).toBeVisible();

		const editItemButton = page.locator('button[aria-label="Edit item button"]');
		await expect(editItemButton).toBeVisible();
		await editItemButton.click();

		await expect(form).toBeVisible();

		await fillInventoryForm({ page, stage: 'edit', dataType: DataType.FAKE });
		await expect(page.locator('text=Item updated successfully!')).toBeVisible();

		await page.keyboard.press('Escape');

		const newAddItemButton = page.locator('button', { hasText: 'Add inventory' });
		await expect(newAddItemButton).toBeVisible();
		await newAddItemButton.click();
		await expect(form).toBeVisible();

		await fillInventoryForm({ page, stage: 'create', dataType: DataType.FUZZ });
		await expect(page.locator('text=Item created successfully!')).toBeVisible();

		await editItemButton.nth(1).click();
		await expect(form).toBeVisible();

		await fillInventoryForm({ page, stage: 'edit', dataType: DataType.FUZZ });
		await expect(page.locator('text=Item updated successfully!')).toBeVisible();

		await page.keyboard.press('Escape');

		let i = 0;
		while (await page.locator('button[aria-label="Delete item button"]').count() > 0) {
			const button = page.locator('button[aria-label="Delete item button"]').first();
			await button.click();
			const confirmDeleteButton = page.locator('button', { hasText: 'YES, DELETE' });
			await expect(confirmDeleteButton).toBeVisible();
			await confirmDeleteButton.click();
			await expect(page.locator('text=Item successfully removed').nth(i)).toBeVisible();
			i++;
			await page.waitForTimeout(500);
		}

		// await page.locator('button[aria-label="Delete item button"]').click();
		// const deleteItemButton = page.locator('button', { hasText: 'YES, DELETE' });
		// await expect(deleteItemButton).toBeVisible();
		// await deleteItemButton.click();
		// await expect(page.locator('text=Item successfully removed')).toBeVisible();

		await page.waitForResponse((response) =>
			response.url().includes('/inventory') &&
			['GET', 'POST', 'PATCH', 'DELETE'].includes(response.request().method()) &&
			(response.status() === 200 || response.status() === 204)
		);
	});
});