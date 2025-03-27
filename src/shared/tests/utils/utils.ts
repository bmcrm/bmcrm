import { SSMClient, GetParameterCommand } from '@aws-sdk/client-ssm';
import { CognitoIdentityProviderClient, AdminDeleteUserCommand } from '@aws-sdk/client-cognito-identity-provider';
import { DeleteItemCommand, DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { expect, type Page } from '@playwright/test';
import { faker } from '@faker-js/faker';
import fc from 'fast-check';
import { addDays, format } from 'date-fns';

export enum DataType {
	FAKE = 'fake',
	FUZZ = 'fuzz',
}

interface DeleteUserProps {
	cognitoPoolId: string;
	email: string;
	tableName: string;
	campID: string;
}

interface FillInventoryFormProps {
	page: Page;
	stage: 'create' | 'edit';
	dataType: DataType;
}

interface FillCalendarEventFormProps {
	page: Page;
	date: 'today' | 'tomorrow';
}

const cognitoClient = new CognitoIdentityProviderClient({
	region: 'us-east-1',
});

const client = new SSMClient({ region: 'us-east-1' });

const ddbClient = new DynamoDBClient({ region: 'us-east-1' });

export const defaultUserData = {
	firstName: 'Test',
	lastName: 'User',
	playaName: 'Fake Playa',
	city: 'fakeTown',
};

export const defaultCampData = {
	name: 'camp for tests',
	city: 'faketown',
	link: 'www.fake.com',
};

export const getParameter = async (name: string): Promise<string> => {
	const resp = client.send(new GetParameterCommand({ Name: name }));
	return resp.then(r => r.Parameter?.Value || '');
};

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
};

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
};

export const getURLs = async (campID?: string): Promise<Record<string, string>> => {
	const APP_URL = await getParameter('/webapp/url');

	return {
		REGISTER: `${APP_URL}/registration`,
		LOGIN: `${APP_URL}/login`,
		FUNNEL: `${APP_URL}/funnel`,
		CAMP_OVERVIEW: `${APP_URL}/id/${campID ?? 'camp-for-tests'}`,
		CAMPERS: `${APP_URL}/campers`,
		SHIFTS: `${APP_URL}/shifts`,
		INVENTORY: `${APP_URL}/inventory`,
		SETTINGS_ACCOUNT: `${APP_URL}/settings/account`,
		SETTINGS_CAMP: `${APP_URL}/settings/camp`,
		DASHBOARD: `${APP_URL}/dashboard`,
	};
};

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

export const customWaitForResponse = ({ page, endpoint }: {page: Page, endpoint: string}) =>
	page.waitForResponse(
		(response) =>
			response.url().includes(endpoint) &&
			['GET', 'PATCH', 'POST', 'DELETE', 'PUT'].includes(response.request().method()) &&
			[200, 201, 202, 204, 304].includes(response.status())
	);

export const generateFuzzData = () => {
	const campName = fc.sample(fc.string({ minLength: 3, maxLength: 32 }), 1)[0];
	const itemName = fc.sample(fc.string({ minLength: 1, maxLength: 5 }), 1)[0];
	const category = fc.sample(fc.string({ minLength: 1, maxLength: 3 }), 1)[0];
	const city = fc.sample(fc.string({ minLength: 2, maxLength: 32 }), 1)[0];
	const firstName = fc.sample(fc.string({ minLength: 1, maxLength: 32 }), 1)[0];
	const lastName = fc.sample(fc.string({ minLength: 1, maxLength: 32 }), 1)[0];
	const playaName = fc.sample(fc.string({ minLength: 0, maxLength: 24 }), 1)[0];
	const summary = fc.sample(fc.string({ minLength: 0, maxLength: 256 }), 1)[0];
	const email = fc.sample(fc.emailAddress(), 1)[0];

	return { campName, itemName, city, firstName, lastName, playaName, summary, email, category };
};

export const generateFakeData = () => {
	const campName = faker.word.words({ count: { min: 1, max: 3 } }).replace(/\s+/g, '-');
	const companyName = faker.company.name();
	const city = faker.location.city();
	const firstName = faker.person.firstName();
	const lastName = faker.person.lastName();
	const playaName = faker.internet.username();
	const bio = faker.person.bio();
	const sentence = faker.lorem.sentence();
	const paragraph = faker.lorem.paragraph();
	const email = faker.internet.email();
	const password = faker.string.alphanumeric(6) +
		faker.string.numeric(1) +
		faker.string.symbol(1) +
		faker.string.alpha(1).toUpperCase();
	const instagram = `https://instagram.com/${faker.internet.username()}`;
	const facebook = `https://facebook.com/${faker.internet.username()}`;
	const randomDate = format(faker.date.future(), 'MM/dd/yyyy');
	const todayDate = format(new Date(), 'MM/dd/yyyy');
	const tomorrowDate = format(addDays(new Date(), 1), 'MM/dd/yyyy');
	const itemName = faker.word.words(3);
	const category = faker.commerce.department();
	const price = faker.commerce.price({ min: 1, max: 10000, dec: 2 });
	const quantity = faker.number.int({ min: 1, max: 1000 });
	const link = faker.internet.url();

	return { campName, companyName, city, firstName, lastName, playaName, bio, sentence, email, password, instagram, facebook, randomDate, todayDate, tomorrowDate, itemName, category, price, quantity, paragraph, link };
};

export const fillCamperDetailsForm = async (page: Page) => {
	const { firstName, lastName, playaName, city, sentence } = generateFakeData();
	const { summary } = generateFuzzData();

	await page.fill('input[name="first_name"]', firstName);
	await page.fill('input[name="last_name"]', lastName);
	await page.fill('input[name="playa_name"]', playaName);
	await page.fill('input[name="city"]', city);
	await page.fill('textarea[name="about_me"]', summary);

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
	await page.fill('textarea[name="history.0.value"]', sentence);

	await page.locator('button[aria-label="Add social button"]').click();
	await page.locator('button[aria-label="Remove social button"]').nth(1).click();

	await page.selectOption('select[name="socials.0.socialName"]', 'facebook');
	await page.fill('input[name="socials.0.userName"]', 'testUser');

	await page.click('button[type="submit"]');
};

export const fillCreateCamperForm = async (page: Page) => {
	const { firstName, lastName } = generateFuzzData();
	const { email } = generateFakeData();

	await page.fill('input[name="email"]', email);
	await page.fill('input[name="first_name"]', firstName);
	await page.fill('input[name="last_name"]', lastName);

	await page.click('button[type="submit"]');
};

export const resetCamperDetailsForm = async (page: Page) => {
	const currentYear = new Date().getFullYear();

	await page.fill('input[name="first_name"]', defaultUserData.firstName);
	await page.fill('input[name="last_name"]', defaultUserData.lastName);
	await page.fill('input[name="playa_name"]', defaultUserData.playaName);
	await page.fill('input[name="city"]', defaultUserData.city);
	await page.fill('textarea[name="about_me"]', '');

	await page.locator(`[role="button"][aria-label="Remove ${currentYear}"]`).click();

	await page.locator('button[aria-label="Remove tag button"]').click();

	await page.locator(`[role="button"][aria-label="Remove tagDetails"]`).click();

	await page.fill('textarea[name="history.0.value"]', '');

	await page.locator('button[aria-label="Remove social button"]').click();

	await page.click('button[type="submit"]');
};

export const createFakeShiftsForm = async (page: Page) => {
	const { itemName, sentence, randomDate } = generateFakeData();
	const fakeTimeEnd = '16:00';
	const fakeTimeStart_2 = '15:00';
	const fakeTimeEnd_2 = '19:00';

	await page.fill('input[name="title"]', itemName);
	await page.fill('textarea[name="description"]', sentence);

	await page.locator('[aria-label="Members select"]').click();
	await page.locator('#react-select-2-option-0').click();

	await page.fill('input[aria-describedby="Datepicker"]', randomDate);
	await page.keyboard.press('Enter');

	await page.locator('button[aria-label="Add time button"]').click();
	await page.fill('input[name="time.0.end_time"]', fakeTimeEnd);
	await page.fill('input[name="time.1.start_time"]', fakeTimeStart_2);
	await page.fill('input[name="time.1.end_time"]', fakeTimeEnd_2);

	await page.click('button[type="submit"]');
};

export const createFuzzShiftsForm = async (page: Page) => {
	const { itemName, summary } = generateFuzzData();
	const { randomDate } = generateFakeData();
	const fakeTimeEnd = '16:00';
	const fakeTimeStart_2 = '15:00';
	const fakeTimeEnd_2 = '19:00';

	await page.fill('input[name="title"]', itemName);
	await page.fill('textarea[name="description"]', summary);

	await page.locator('[aria-label="Members select"]').click();
	await page.locator('#react-select-2-option-0').click();

	await page.fill('input[aria-describedby="Datepicker"]', randomDate);
	await page.keyboard.press('Enter');

	await page.locator('button[aria-label="Add time button"]').click();
	await page.fill('input[name="time.0.end_time"]', fakeTimeEnd);
	await page.fill('input[name="time.1.start_time"]', fakeTimeStart_2);
	await page.fill('input[name="time.1.end_time"]', fakeTimeEnd_2);

	await page.waitForTimeout(500);

	await page.click('button[type="submit"]');
};

export const editFakeShiftsForm = async (page: Page) => {
	const { itemName, sentence } = generateFakeData();
	const fakeToday = format(new Date(), 'dd.MM.yyyy');
	const fakeTomorrow = format(new Date(new Date().setDate(new Date().getDate() + 1)), 'dd.MM.yyyy');
	const fakeDate = `${fakeToday} - ${fakeTomorrow}`;
	const fakeTimeEnd = '12:00';

	await page.fill('input[name="title"]', itemName);
	await page.fill('textarea[name="description"]', sentence);

	await page.fill('input[aria-describedby="Datepicker"]', fakeDate);
	await page.keyboard.press('Enter');

	const removeTimeButtons = page.locator('button[aria-label="Remove time button"]');
	await removeTimeButtons.click();

	await page.fill('input[name="time.0.end_time"]', fakeTimeEnd);

	await page.click('button[type="submit"]');
};

export const editFuzzShiftsForm = async (page: Page) => {
	const { itemName, summary } = generateFuzzData();
	const fakeToday = format(new Date(), 'dd.MM.yyyy');
	const fakeTomorrow = format(new Date(new Date().setDate(new Date().getDate() + 1)), 'dd.MM.yyyy');
	const fakeDate = `${fakeToday} - ${fakeTomorrow}`;
	const fakeTimeEnd = '12:00';

	await page.fill('input[name="title"]', itemName);
	await page.fill('textarea[name="description"]', summary);

	await page.fill('input[aria-describedby="Datepicker"]', fakeDate);
	await page.keyboard.press('Enter');

	const removeTimeButtons = page.locator('button[aria-label="Remove time button"]');
	await removeTimeButtons.click();

	await page.fill('input[name="time.0.end_time"]', fakeTimeEnd);

	await page.click('button[type="submit"]');
};

export const fillInventoryForm = async ({ page, stage, dataType }: FillInventoryFormProps) => {
	const { itemName, sentence, category, price, quantity } = generateFakeData();
	const { itemName: fuzzItemName, summary, category: fuzzCategory } = generateFuzzData();

	const data = {
		title: {
			[DataType.FAKE]: itemName,
			[DataType.FUZZ]: fuzzItemName,
		},
		description: {
			[DataType.FAKE]: sentence,
      [DataType.FUZZ]: summary,
		},
		category: {
			[DataType.FAKE]: category,
      [DataType.FUZZ]: fuzzCategory,
		},
	};

	await page.fill('input[name="title"]', data.title[dataType]);
	await page.fill('input[name="description"]', data.description[dataType]);
	await page.fill('input[name="price"]', price);
	await page.fill('input[name="quantity"]', String(quantity));

	if (stage === 'create') {
		await page.fill('input[name="category"]', data.category[dataType]);
	}

	await page.click('button[type="submit"]');
};

export const fillSettingsAccountForm = async (page: Page) => {
	const { firstName, lastName, playaName, city, summary } = generateFuzzData();
	const { sentence } = generateFakeData();
	const { sentence: sentence_2 } = generateFakeData();

	await page.fill('input[name="first_name"]', firstName);
	await page.fill('input[name="last_name"]', lastName);
	await page.fill('input[name="playa_name"]', playaName);
	await page.fill('input[name="city"]', city);
	await page.fill('textarea[name="about_me"]', summary);

	await page.locator('[aria-label="Visited BM`s select"]').click();
	await page.locator('#react-select-2-option-0').click();

	await page.locator('button[aria-label="Add history button"]').click();
	await page.fill('textarea[name="history.0.value"]', sentence);
	await page.fill('textarea[name="history.1.value"]', sentence_2);

	await page.locator('button[aria-label="Add social button"]').click();

	await page.selectOption('select[name="socials.0.socialName"]', 'facebook');
	await page.fill('input[name="socials.0.userName"]', 'testFacebook');
	await page.selectOption('select[name="socials.1.socialName"]', 'instagram');
	await page.fill('input[name="socials.1.userName"]', 'testInstagram');

	await page.click('button[type="submit"]');
};

export const resetSettingsAccountForm = async (page: Page) => {
	const currentYear = new Date().getFullYear();

	await page.fill('input[name="first_name"]', defaultUserData.firstName);
	await page.fill('input[name="last_name"]', defaultUserData.lastName);
	await page.fill('input[name="playa_name"]', defaultUserData.playaName);
	await page.fill('input[name="city"]', defaultUserData.city);
	await page.fill('textarea[name="about_me"]', '');

	await page.locator(`[role="button"][aria-label="Remove ${currentYear}"]`).click();

	await page.locator('button[aria-label="Remove history button"]').click();
	await page.fill('textarea[name="history.0.value"]', '');

	while ((await page.locator('button[aria-label="Remove social button"]').count()) > 1) {
		await page.locator('button[aria-label="Remove social button"]').first().click();
	}

	await page.selectOption('select[name="socials.0.socialName"]', 'default');
	await page.fill('input[name="socials.0.userName"]', '');

	await page.click('button[type="submit"]');
};

export const fillSettingsCampForm = async (page: Page) => {
	const { campName, city, summary } = generateFuzzData();
	const { link } = generateFakeData();

	await page.fill('input[name="camp_name"]', campName);
	await page.fill('input[name="city"]', city);
	await page.fill('input[name="camp_website"]', link);
	await page.fill('textarea[name="camp_description"]', summary);

	await page.click('button[type="submit"]');
};

export const resetSettingsCampForm = async (page: Page) => {
	await page.fill('input[name="camp_name"]', defaultCampData.name);
	await page.fill('input[name="city"]', defaultCampData.city);
	await page.fill('input[name="camp_website"]', defaultCampData.link);
	await page.fill('textarea[name="camp_description"]', '');

	await page.click('button[type="submit"]');
};

export const fillCalendarEventForm = async ({ page, date }: FillCalendarEventFormProps) => {
	const { itemName } = generateFuzzData();
	const { todayDate, tomorrowDate } = generateFakeData();

	await page.fill('input[name="event"]', itemName);
	await page.fill('input[aria-describedby="Event date"]', date === 'today' ? todayDate : tomorrowDate);

	await page.click('button[type="submit"]');
};