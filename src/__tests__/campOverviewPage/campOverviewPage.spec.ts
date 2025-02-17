import { expect, test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { getTestParameters, getURLs, login } from '@shared/tests/utils/utils';
import { CAMPER_ENDPOINT } from '@shared/const/endpoints';

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

	test('Fake registration from the camp page', async ({ page }) => {
		await page.route(`${CAMPER_ENDPOINT}/create`, route => route.abort());

		const fakePlayaName = faker.internet.username();
		const fakeFirstName = faker.person.firstName();
		const fakeLastName = faker.person.lastName();
		const fakeEmail = faker.internet.email();
		const fakePassword = faker.string.alphanumeric(6) +
			faker.string.numeric(1) +
			faker.string.symbol(1) +
			faker.string.alpha(1).toUpperCase();

		await page.goto(URLS.CAMP_OVERVIEW_URL);

		await expect(page).toHaveURL(URLS.CAMP_OVERVIEW_URL);
		await expect(page.locator('text=camp for tests')).toBeVisible();

		await page.fill('input[name="playa_name"]', fakePlayaName);
		await page.fill('input[name="first_name"]', fakeFirstName);
		await page.fill('input[name="last_name"]', fakeLastName);
		await page.fill('input[name="email"]', fakeEmail);
		await page.fill('input[name="password"]', fakePassword);
		await page.click('label[aria-label="Accept terms"]');
		await page.click('button[type="submit"]');

		await expect(page).toHaveURL(URLS.CAMP_OVERVIEW_URL);
	});
});