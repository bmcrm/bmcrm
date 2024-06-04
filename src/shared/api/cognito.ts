import {
  CognitoIdentityProviderClient,
  SignUpCommand,
  InitiateAuthCommand,
  SignUpCommandInput,
  InitiateAuthCommandInput,
  ConfirmSignUpCommand,
  ListUsersCommand,
} from '@aws-sdk/client-cognito-identity-provider';

const REGION = import.meta.env.VITE_REGION;
const COGNITO_APP_CLIENT_ID = import.meta.env.VITE_COGNITO_APP_CLIENT_ID;
const COGNITO_AWS_POOL_ID = import.meta.env.VITE_COGNITO_AWS_POOL_ID;

const cognitoClient = new CognitoIdentityProviderClient({
  region: REGION,
});

interface ConfirmCode {
  code: string;
  username: string;
}
interface SignUpData {
  password: string;
  email: string;
  campName: string;
  campId: string;
  city: string;
  website: string;
  firstName: string;
  lastName: string;
  playaName: string;
}
export const signUpUser = async (userData: SignUpData): Promise<unknown> => {
  const params: SignUpCommandInput = {
    ClientId: COGNITO_APP_CLIENT_ID,
    Username: userData.email,
    Password: userData.password,
    UserAttributes: [
      { Name: 'email', Value: userData.email },
      { Name: 'website', Value: userData.website },
      { Name: 'custom:created_at', Value: new Date().getTime().toString() },
      { Name: 'updated_at', Value: new Date().getTime().toString() },
      { Name: 'custom:camp_name', Value: userData.campName },
      { Name: 'custom:camp_id', Value: userData.campId },
      { Name: 'custom:city', Value: userData.city },
      { Name: 'custom:first_name', Value: userData.firstName },
      { Name: 'custom:last_name', Value: userData.lastName },
      { Name: 'custom:playa_name', Value: userData.playaName },
    ],
  };

  const data = await cognitoClient.send(new SignUpCommand(params));

  return data;
};

export const confirmEmail = async ({ username, code }: ConfirmCode) => {
  const client = new CognitoIdentityProviderClient({ region: REGION });
  try {
    const command = new ConfirmSignUpCommand({
      ClientId: COGNITO_APP_CLIENT_ID,
      Username: username,
      ConfirmationCode: code,
    });

    const response = await client.send(command);

    return response;
  } catch (error) {
    console.error('Error confirming email:', error);
    throw error;
  }
};

export const listUsers = async () => {
  const client = new CognitoIdentityProviderClient({ region: REGION });

  const params = {
    UserPoolId: COGNITO_AWS_POOL_ID,
  };

  try {
    const command = new ListUsersCommand(params);

    const response = await client.send(command);

    return response.Users;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
export const loginUser = async ({ username, password }: { username: string; password: string }) => {
  const params: InitiateAuthCommandInput = {
    AuthFlow: 'USER_PASSWORD_AUTH',
    ClientId: COGNITO_APP_CLIENT_ID,
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
    },
  };

  try {
    const data = await cognitoClient.send(new InitiateAuthCommand(params));
    return data.AuthenticationResult;
  } catch (error) {
    console.error('Login failed', error);
  }
};
