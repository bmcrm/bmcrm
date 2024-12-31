import { SSMClient, GetParameterCommand } from '@aws-sdk/client-ssm';
import {
  MessageActionType,
  AuthFlowType,
  ChallengeNameType,
  CognitoIdentityProviderClient,
  AdminCreateUserCommand,
  AdminInitiateAuthCommand,
  RespondToAuthChallengeCommand,
  AdminDeleteUserCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import { expect, type Page } from '@playwright/test';

const cognitoClient = new CognitoIdentityProviderClient({
  region: 'us-east-1',
});

const client = new SSMClient({ region: 'us-east-1' });

export async function getParameter(name: string): Promise<string> {
  const resp = client.send(new GetParameterCommand({ Name: name }));
  return resp.then(r => r.Parameter?.Value || '');
}

export async function createUser(
  testCognitoPoolId: string,
  testEmail: string,
  testSOID: string,
  testName: string,
  tempPassword: string,
): Promise<void> {
  const params = {
    UserPoolId: testCognitoPoolId,
    Username: testEmail,
    UserAttributes: [
      {
        Name: 'name',
        Value: testName,
      },
      {
        Name: 'email',
        Value: testEmail,
      },
      {
        Name: 'custom:SOID',
        Value: testSOID,
      },
    ],
    TemporaryPassword: tempPassword,
    MessageAction: MessageActionType.SUPPRESS,
  };

  try {
    const command = new AdminCreateUserCommand(params);
    await cognitoClient.send(command);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function initiateAuth(
  testCognitoPoolId: string,
  cognitoAppClientId: string,
  testEmail: string,
  tempPassword: string,
  newPassword: string
): Promise<void> {
  const params = {
    UserPoolId: testCognitoPoolId,
    ClientId: cognitoAppClientId,
    AuthFlow: AuthFlowType.ADMIN_USER_PASSWORD_AUTH,
    AuthParameters: {
      USERNAME: testEmail,
      PASSWORD: tempPassword,
    },
  };

  try {
    const command = new AdminInitiateAuthCommand(params);
    const response = await cognitoClient.send(command);

    if (response.ChallengeName === ChallengeNameType.NEW_PASSWORD_REQUIRED) {
      const challengeResponse = {
        UserPoolId: testCognitoPoolId,
        ClientId: cognitoAppClientId,
        ChallengeName: ChallengeNameType.NEW_PASSWORD_REQUIRED,
        Session: response.Session,
        ChallengeResponses: {
          USERNAME: testEmail,
          NEW_PASSWORD: newPassword,
        },
      };

      const respondCommand = new RespondToAuthChallengeCommand(challengeResponse);
      await cognitoClient.send(respondCommand);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteUser(
  testCognitoPoolId: string,
  username: string,
): Promise<void> {
  const params = {
    UserPoolId: testCognitoPoolId,
    Username: username,
  };

  try {
    const command = new AdminDeleteUserCommand(params);
    await cognitoClient.send(command);
  } catch (error) {
    console.error('Error deleting user', error);
    throw error;
  }
}

export async function getTestParameters(): Promise<{
  TEST_COGNITO_POOL_ID: string;
  COGNITO_APP_CLIENT_ID: string;
  TEST_EMAIL: string;
  TEMP_PASSWORD: string;
  NEW_PASSWORD: string;
}> {
  const [
    TEST_COGNITO_POOL_ID,
    COGNITO_APP_CLIENT_ID,
    TEST_EMAIL,
    TEMP_PASSWORD,
    NEW_PASSWORD,
  ] = await Promise.all([
    getParameter('/campers/cognito_user_pool_id'),
    getParameter('/campers/cognito_client_pool_id'),
    getParameter('/webapp/test/email'),
    getParameter('/webapp/test/password_temp'),
    getParameter('/webapp/test/password_new'),
  ]);

  return {
    TEST_COGNITO_POOL_ID,
    COGNITO_APP_CLIENT_ID,
    TEST_EMAIL,
    TEMP_PASSWORD,
    NEW_PASSWORD,
  };
}

export async function getURLs(): Promise<Record<string, string>> {
  const APP_URL = await getParameter('/webapp/url');

  return {
    REGISTER_URL: `${APP_URL}/registration`,
    LOGIN_URL: `${APP_URL}/login`,
    FUNNEL_URL: `${APP_URL}/funnel`,
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
  await expect(page).toHaveURL(URLS.FUNNEL_URL);
};

export const getFormattedDate = (): string => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};