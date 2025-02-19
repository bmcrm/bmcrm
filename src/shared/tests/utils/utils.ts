import { SSMClient, GetParameterCommand } from '@aws-sdk/client-ssm';
import { CognitoIdentityProviderClient, AdminDeleteUserCommand } from '@aws-sdk/client-cognito-identity-provider';
import { DeleteItemCommand, DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { expect, type Page } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { format } from 'date-fns';

const cognitoClient = new CognitoIdentityProviderClient({
	region: 'us-east-1',
});

const client = new SSMClient({ region: 'us-east-1' });

const ddbClient = new DynamoDBClient({ region: 'us-east-1' });

interface DeleteUserProps {
	cognitoPoolId: string;
	email: string;
	tableName: string;
	campID: string;
}

export const getParameter = async (name: string): Promise<string> => {
	const resp = client.send(new GetParameterCommand({ Name: name }));
	return resp.then(r => r.Parameter?.Value || '');
}

export const deleteUser = async (props: DeleteUserProps): Promise<void> => {
	const { email, cognitoPoolId, tableName, campID } = props;

	const cognitoParams = {
		UserPoolId: cognitoPoolId,
		Username: email,
	};

	const dbParams = {
		TableName: tableName,
		Key: {
			camp_id: { S: campID },
			email: { S: email },
		},
	};

	try {
		await cognitoClient.send(new AdminDeleteUserCommand(cognitoParams));
		await ddbClient.send(new DeleteItemCommand(dbParams));
	} catch (error) {
		console.error('Error deleting user', error);
		throw error;
	}
}

export const getTestParameters = async (): Promise<{
	TEST_COGNITO_POOL_ID: string;
	COGNITO_APP_CLIENT_ID: string;
	TEST_EMAIL: string;
	TEMP_PASSWORD: string;
	NEW_PASSWORD: string;
	CAMP_ID: string;
	APP_URL: string;
}> => {
	const [
		TEST_COGNITO_POOL_ID,
		COGNITO_APP_CLIENT_ID,
		TEST_EMAIL,
		TEMP_PASSWORD,
		NEW_PASSWORD,
		CAMP_ID,
		APP_URL,
	] = await Promise.all([
		getParameter('/campers/cognito_user_pool_id'),
		getParameter('/campers/cognito_client_pool_id'),
		getParameter('/webapp/test/email'),
		getParameter('/webapp/test/password_temp'),
		getParameter('/webapp/test/password_new'),
		getParameter('/webapp/test/account_camp_id'),
		getParameter('/webapp/url'),
	]);

	return {
		TEST_COGNITO_POOL_ID,
		COGNITO_APP_CLIENT_ID,
		TEST_EMAIL,
		TEMP_PASSWORD,
		NEW_PASSWORD,
		CAMP_ID,
		APP_URL,
	};
}

export const getURLs = async (campID?: string): Promise<Record<string, string>> => {
	const APP_URL = await getParameter('/webapp/url');

	return {
		REGISTER: `${APP_URL}/registration`,
		LOGIN: `${APP_URL}/login`,
		FUNNEL: `${APP_URL}/funnel`,
		CAMP_OVERVIEW: `${APP_URL}/id/${campID ?? 'camp-for-tests'}`,
		CAMPERS: `${APP_URL}/campers`,
		SHIFTS: `${APP_URL}/shifts`,
	};
}

export const login = async (
	page: Page,
	URLS: Record<string, string>,
	TEST_PARAMS: Record<string, string>
) => {
	await page.goto(URLS.LOGIN);
	await page.fill('input[name="email"]', TEST_PARAMS.TEST_EMAIL);
	await page.fill('input[name="password"]', TEST_PARAMS.NEW_PASSWORD);
	await page.click('button[type="submit"]');
	await expect(page).toHaveURL(URLS.CAMPERS);
};

export const fillCamperDetailsForm = async (page: Page) => {
	const fakeFirstName = faker.person.firstName();
	const fakeLastName = faker.person.lastName();
	const fakePlayaName = faker.internet.username();
	const fakeCity = faker.location.city();
	const fakeSummary = faker.person.bio();
	const fakeHistory = faker.lorem.sentence();
	const fakeInstagram = `https://instagram.com/${faker.internet.username()}`;

	await page.fill('input[name="first_name"]', fakeFirstName);
	await page.fill('input[name="last_name"]', fakeLastName);
	await page.fill('input[name="playa_name"]', fakePlayaName);
	await page.fill('input[name="city"]', fakeCity);
	await page.fill('textarea[name="about_me"]', fakeSummary);

	await page.locator('[aria-label="Visited BM`s select"]').click();
	await page.locator('#react-select-2-option-0').click();

	await page.locator('button[aria-label="Add tag button"]').click();
	const removeTagButtons = page.locator('button[aria-label="Remove tag button"]');
	await removeTagButtons.nth(1).click();

	await page.fill('input[name="tags.0.tagName"]', 'newTag');
	await page.locator('[aria-label="Tags select"]').click();
	await page.fill('input[aria-label="Tags select"]', 'tagDetails');
	await page.keyboard.press('Enter');

	await page.locator('button[aria-label="Add history button"]').click();
	await page.locator('button[aria-label="Remove history button"]').click();
	await page.fill('textarea[name="history.0.value"]', fakeHistory);

	await page.locator('button[aria-label="Add social button"]').click();
	await page.locator('button[aria-label="Remove social button"]').nth(1).click();
	await page.fill('input[name="social_links.0.url"]', fakeInstagram);

	await page.click('button[type="submit"]');
};

export const resetCamperDetailsForm = async (page: Page) => {
	const currentYear = new Date().getFullYear();

	await page.fill('input[name="first_name"]', 'Test');
	await page.fill('input[name="last_name"]', 'User');
	await page.fill('input[name="playa_name"]', 'Fake Playa');
	await page.fill('input[name="city"]', 'fakeTown');
	await page.fill('textarea[name="about_me"]', '');

	await page.locator(`[role="button"][aria-label="Remove ${currentYear}"]`).click();

	await page.locator('button[aria-label="Remove tag button"]').click();

	await page.locator(`[role="button"][aria-label="Remove tagDetails"]`).click();

	await page.fill('textarea[name="history.0.value"]', '');

	await page.locator('button[aria-label="Remove social button"]').click();

	await page.click('button[type="submit"]');
};

export const createShiftsForm = async (page: Page) => {
	const fakeShiftName = faker.word.words(3);
	const fakeDescription = faker.lorem.sentence();
	const fakeDate = format(faker.date.future(), 'dd.MM.yyyy');
	const fakeTimeEnd = '16:00';
	const fakeTimeStart_2 = '15:00';
	const fakeTimeEnd_2 = '19:00';

	await page.fill('input[name="title"]', fakeShiftName);
	await page.fill('textarea[name="description"]', fakeDescription);

	await page.locator('[aria-label="Members select"]').click();
	await page.locator('#react-select-2-option-0').click();

	await page.fill('input[aria-describedby="Datepicker"]', fakeDate);
	await page.keyboard.press('Enter');

	await page.locator('button[aria-label="Add time button"]').click();
	await page.fill('input[name="time.0.end_time"]', fakeTimeEnd);
	await page.fill('input[name="time.1.start_time"]', fakeTimeStart_2);
	await page.fill('input[name="time.1.end_time"]', fakeTimeEnd_2);

	await page.click('button[type="submit"]');
};

export const editShiftsForm = async (page: Page) => {
	const fakeShiftName = faker.word.words(3);
	const fakeDescription = faker.lorem.sentence();
	const fakeToday = format(new Date(), 'dd.MM.yyyy');
	const fakeTomorrow = format(new Date(new Date().setDate(new Date().getDate() + 1)), 'dd.MM.yyyy');
	const fakeDate = `${fakeToday} - ${fakeTomorrow}`;
	const fakeTimeEnd = '12:00';

	await page.fill('input[name="title"]', fakeShiftName);
	await page.fill('textarea[name="description"]', fakeDescription);

	await page.fill('input[aria-describedby="Datepicker"]', fakeDate);
	await page.keyboard.press('Enter');

	const removeTimeButtons = page.locator('button[aria-label="Remove time button"]');
	await removeTimeButtons.click();

	await page.fill('input[name="time.0.end_time"]', fakeTimeEnd);

	await page.click('button[type="submit"]');
};