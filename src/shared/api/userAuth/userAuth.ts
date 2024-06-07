import {
  CognitoIdentityProviderClient,
  SignUpCommand,
  InitiateAuthCommand,
  SignUpCommandInput,
  InitiateAuthCommandInput,
  ConfirmSignUpCommand,
  ListUsersCommand,
  ForgotPasswordCommandInput,
  ForgotPasswordCommand, ConfirmForgotPasswordCommandInput, ConfirmForgotPasswordCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import { EnvConfigs } from 'shared/config/env/env';

const cognitoClient = new CognitoIdentityProviderClient({
  region: EnvConfigs.AWS_REGION,
});

interface ConfirmCode {
  code: string;
  email: string;
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

interface IConfirmResetPassword {
  email: string;
  confirmCode: string;
  newPassword: string;
}

export const signUpUser = async (userData: SignUpData): Promise<unknown> => {
  const params: SignUpCommandInput = {
    ClientId: EnvConfigs.COGNITO_APP_CLIENT_ID,
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

export const confirmEmail = async ({ email, code }: ConfirmCode) => {
  const client = new CognitoIdentityProviderClient({ region: EnvConfigs.AWS_REGION });
  try {
    const command = new ConfirmSignUpCommand({
      ClientId: EnvConfigs.COGNITO_APP_CLIENT_ID,
      Username: email,
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
  const client = new CognitoIdentityProviderClient({ region: EnvConfigs.AWS_REGION });

  const params = {
    UserPoolId: EnvConfigs.COGNITO_AWS_POOL_ID,
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

export const loginUser = async ({ email, password }: { email: string; password: string }) => {
  const params: InitiateAuthCommandInput = {
    AuthFlow: 'USER_PASSWORD_AUTH',
    ClientId: EnvConfigs.COGNITO_APP_CLIENT_ID,
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password,
    },
  };

  try {
    const data = await cognitoClient.send(new InitiateAuthCommand(params));
    return data.AuthenticationResult;
  } catch (error) {
    console.error('User not confirmed', error);
    console.log('COGNITO_APP_CLIENT_ID >>>>>', EnvConfigs.COGNITO_APP_CLIENT_ID);
    console.log('COGNITO_AWS_POOL_ID >>>>>>>', EnvConfigs.COGNITO_AWS_POOL_ID);

    throw error;
  }
};

export const initResetPassword = async ({ email }: { email: string }): Promise<unknown> => {
  const params: ForgotPasswordCommandInput = {
    ClientId: EnvConfigs.COGNITO_APP_CLIENT_ID,
    Username: email,
  };

  try {
    const data = await cognitoClient.send(new ForgotPasswordCommand(params));
    return data;
  } catch (error) {
    console.error('Error initiating forgot password:', error);
    throw error;
  }
};

export const confirmResetPassword = async ({ email, confirmCode, newPassword }: IConfirmResetPassword): Promise<unknown> => {
  const params: ConfirmForgotPasswordCommandInput = {
    ClientId: EnvConfigs.COGNITO_APP_CLIENT_ID,
    Username: email,
    ConfirmationCode: confirmCode,
    Password: newPassword,
  };

  try {
    const data = await cognitoClient.send(new ConfirmForgotPasswordCommand(params));
    return data;
  } catch (error) {
    console.error('Error confirming forgot password:', error);
    throw error;
  }
};