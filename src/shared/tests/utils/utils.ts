import { SSMClient, GetParameterCommand } from '@aws-sdk/client-ssm';
import { CognitoIdentityProviderClient, AdminDeleteUserCommand } from '@aws-sdk/client-cognito-identity-provider';
import { DeleteItemCommand, DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { expect, type Page } from '@playwright/test';

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
		REGISTER_URL: `${APP_URL}/registration`,
		LOGIN_URL: `${APP_URL}/login`,
		FUNNEL_URL: `${APP_URL}/funnel`,
		CAMP_OVERVIEW_URL: `${APP_URL}/id/${campID ?? 'camp-for-tests'}`,
		CAMPERS: `${APP_URL}/campers`,
	};
}

export const login = async (
	page: Page,
	URLS: Record<string, string>,
	TEST_PARAMS: Record<string, string>
) => {
	await page.goto(URLS.LOGIN_URL);
	await page.fill('input[name="email"]', TEST_PARAMS.TEST_EMAIL);
	await page.fill('input[name="password"]', TEST_PARAMS.NEW_PASSWORD);
	await page.click('button[type="submit"]');
	await expect(page).toHaveURL(URLS.CAMPERS);
};