import { test, expect } from '@playwright/test';
import { SSMClient, GetParameterCommand } from '@aws-sdk/client-ssm';
import {
  CognitoIdentityProviderClient,
  AdminCreateUserCommand,
  MessageActionType,
  AdminInitiateAuthCommand,
  AuthFlowType,
  RespondToAuthChallengeCommand,
  AdminDeleteUserCommand,
  ChallengeNameType,
} from '@aws-sdk/client-cognito-identity-provider';
import { DynamoDBClient, DeleteItemCommand, DeleteItemCommandInput } from '@aws-sdk/client-dynamodb';
const cognitoClient = new CognitoIdentityProviderClient({
  region: 'us-east-1',
});

const client = new SSMClient({ region: 'us-east-1' });
function getParameter(name: string): Promise<string> {
  const resp = client.send(new GetParameterCommand({ Name: name }));
  return resp.then(r => r.Parameter?.Value || '');
}

const LOGIN_URL = 'http://localhost:5173/login' || 'https://app.dev.bmcrm.camp/login';
// const RESET_URL = 'https://app.dev.bmcrm.camp/reset-password';
const FUNNEL_URL = 'http://localhost:5173/funnel' || 'https://app.dev.bmcrm.camp/funnel';

// we have separate test account for a TCO persona and a Camper persona

const TEST_COGNITO_POOL_ID = await getParameter('/campers/cognito_user_pool_id');
const COGNITO_APP_CLIENT_ID = await getParameter('/campers/cognito_client_pool_id');
const TEST_EMAIL = await getParameter('/webapp/test/email');
const CAMP_ID = await getParameter('/webapp/test/account_camp_id');
const TEMP_PASSWORD = await getParameter('/webapp/test/password_temp');
const NEW_PASSWORD = await getParameter('/webapp/test/password_new');
const USER_ROLE = await getParameter('/webapp/test/user_role');
const TABLE_NAME = await getParameter('/campers/ddb_table_name');
const createUser = async () => {
  const params = {
    UserPoolId: TEST_COGNITO_POOL_ID,
    Username: TEST_EMAIL,
    UserAttributes: [
      {
        Name: 'email',
        Value: TEST_EMAIL,
      },
      {
        Name: 'custom:camp_id',
        Value: CAMP_ID,
      },
      {
        Name: 'custom:role',
        Value: USER_ROLE,
      },
    ],
    TemporaryPassword: TEMP_PASSWORD,
    MessageAction: MessageActionType.SUPPRESS,
  };

  try {
    const command = new AdminCreateUserCommand(params);
    await cognitoClient.send(command);
  } catch (error) {
    console.error(error);
  }
};
const initiateAuth = async () => {
  const params = {
    UserPoolId: TEST_COGNITO_POOL_ID,
    ClientId: COGNITO_APP_CLIENT_ID,
    AuthFlow: AuthFlowType.ADMIN_USER_PASSWORD_AUTH,
    AuthParameters: {
      USERNAME: TEST_EMAIL,
      PASSWORD: TEMP_PASSWORD,
    },
  };

  try {
    const command = new AdminInitiateAuthCommand(params);
    const response = await cognitoClient.send(command);

    if (response.ChallengeName === ChallengeNameType.NEW_PASSWORD_REQUIRED) {
      const newPassword = NEW_PASSWORD;

      const challengeResponse = {
        UserPoolId: TEST_COGNITO_POOL_ID,
        ClientId: COGNITO_APP_CLIENT_ID,
        ChallengeName: ChallengeNameType.NEW_PASSWORD_REQUIRED,
        Session: response.Session,
        ChallengeResponses: {
          USERNAME: TEST_EMAIL,
          NEW_PASSWORD: newPassword,
        },
      };

      const respondCommand = new RespondToAuthChallengeCommand(challengeResponse);
      await cognitoClient.send(respondCommand);
    }
  } catch (error) {
    console.error(error);
  }
};
const deleteUser = async (username: string, camp_id: string) => {
  const params = {
    UserPoolId: TEST_COGNITO_POOL_ID,
    Username: username,
  };
  const paramsDDB: DeleteItemCommandInput = {
    TableName: TABLE_NAME,
    Key: {
      camp_id: { S: camp_id },
      email: { S: username },
    },
  };
  const dynamoDBClient = new DynamoDBClient({});
  try {
    await dynamoDBClient.send(new DeleteItemCommand(paramsDDB));
  } catch (err) {
    console.error('Error deleting camper:', err);
    throw err;
  }

  try {
    const command = new AdminDeleteUserCommand(params);
    await cognitoClient.send(command);
  } catch (error) {
    console.error('Error deleting user', error);
  }
};

test.beforeEach(async ({ page }) => {
  await createUser();
  await initiateAuth();
  await page.goto(LOGIN_URL);
});
test.afterEach(async ({ page }) => {
  await deleteUser(TEST_EMAIL, CAMP_ID);
  await page.goto(LOGIN_URL);
});

test('successful login', async ({ page }) => {
  await page.goto(LOGIN_URL);
  await page.fill('input[name="email"]', TEST_EMAIL);
  await page.fill('input[name="password"]', NEW_PASSWORD);
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL(FUNNEL_URL);
  await expect(page.locator('text=Invite')).toBeVisible();
});
test('unsuccessful login with incorrect credentials', async ({ page }) => {
  await page.goto(LOGIN_URL);
  await page.fill('input[name="email"]', 'incorrect_email@example.com');
  await page.fill('input[name="password"]', NEW_PASSWORD);
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL(LOGIN_URL);
  await expect(page.locator('text=User does not exist')).toBeVisible();
});
test('unsuccessful login without providing credentials', async ({ page }) => {
  await page.goto(LOGIN_URL);
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL(LOGIN_URL);
  await expect(page.locator('text=Email is required')).toBeVisible();
});

// test('successful logout', async ({ page }) => {
//   await page.goto(LOGIN_URL);
//   await page.fill('input[name="email"]', TEST_ACCOUNT_TCO_EMAIL);
//   await page.fill('input[name="password"]', TEST_ACCOUNT_TCO_PASSWORD);
//   await page.click('button[type="submit"]');
//   await expect(page).toHaveURL(LOGIN_URL);
//   const element = await page.locator('text=Sd');
//   await element.hover();
//   const logoutBtn = await page.locator('text=Log Out');
//   await logoutBtn.click();
//   await expect(page).toHaveURL(LOGIN_URL);
// });
// test('forgot password unsuccessful', async ({ page }) => {
//   await page.goto(LOGIN_URL);
//   await page.fill('input[name="email"]', TEST_ACCOUNT_TCO_EMAIL);
//   await page.locator('text=Forgot Password?').click();
//   await expect(page).toHaveURL(RESET_URL);
//   await expect(page.locator('text=Forgot Password')).toBeVisible();
//   await page.fill('input[name="email"]', 'incorrect_email@example.com');
//   await page.click('button[type="submit"]');
//   await expect(page).toHaveURL(RESET_URL);
//   await expect(page.locator('text=Oops, something wrong! Try again later!')).toBeVisible();
// });
