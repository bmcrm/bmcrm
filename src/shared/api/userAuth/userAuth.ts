import {
  CognitoIdentityProviderClient,
  SignUpCommand,
  InitiateAuthCommand,
  SignUpCommandInput,
  InitiateAuthCommandInput,
  ConfirmSignUpCommand,
  ListUsersCommand,
  ForgotPasswordCommandInput,
  ForgotPasswordCommand,
  ConfirmForgotPasswordCommandInput,
  ConfirmForgotPasswordCommand,
  GlobalSignOutCommand,
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
  camp_website: string;
  firstName: string;
  lastName: string;
  playaName: string;
  role: string;
}

export interface InviteData {
  email: string;
  camp_id: string;
  role: string;
}

interface IConfirmResetPassword {
  email: string;
  confirmCode: string;
  newPassword: string;
}

export const signUpUser = async (userData: SignUpData) => {
  const params: SignUpCommandInput = {
    ClientId: EnvConfigs.COGNITO_APP_CLIENT_ID,
    Username: userData.email,
    Password: userData.password,
    UserAttributes: [
      { Name: 'email', Value: userData.email },
      { Name: 'custom:camp_website', Value: userData.camp_website },
      { Name: 'custom:created_at', Value: new Date().getTime().toString() },
      { Name: 'updated_at', Value: new Date().getTime().toString() },
      { Name: 'custom:camp_name', Value: userData.campName },
      { Name: 'custom:camp_id', Value: userData.campId },
      { Name: 'custom:city', Value: userData.city },
      { Name: 'custom:first_name', Value: userData.firstName },
      { Name: 'custom:last_name', Value: userData.lastName },
      { Name: 'custom:playa_name', Value: userData.playaName },
      { Name: 'custom:role', Value: userData.role },
    ],
  };

  return await cognitoClient.send(new SignUpCommand(params));
};

export const inviteUser = async (userData: InviteData) => {
  const params: SignUpCommandInput = {
    ClientId: EnvConfigs.COGNITO_APP_CLIENT_ID,
    Username: userData.email,
    Password: '123qweQ!',
    UserAttributes: [
      { Name: 'email', Value: userData.email },
      { Name: 'custom:created_at', Value: new Date().getTime().toString() },
      { Name: 'updated_at', Value: new Date().getTime().toString() },
      { Name: 'custom:camp_id', Value: userData.camp_id },
      { Name: 'custom:role', Value: userData.role },
    ],
  };

  return await cognitoClient.send(new SignUpCommand(params));
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

  const data = await cognitoClient.send(new InitiateAuthCommand(params));

  return data.AuthenticationResult;
};

export const confirmEmail = async ({ email, code }: ConfirmCode) => {
  const command = new ConfirmSignUpCommand({
    ClientId: EnvConfigs.COGNITO_APP_CLIENT_ID,
    Username: email,
    ConfirmationCode: code,
  });

  return await cognitoClient.send(command);
};

export const initResetPassword = async ({ email }: { email: string }) => {
  const params: ForgotPasswordCommandInput = {
    ClientId: EnvConfigs.COGNITO_APP_CLIENT_ID,
    Username: email,
  };

  return await cognitoClient.send(new ForgotPasswordCommand(params));
};

export const confirmResetPassword = async (props: IConfirmResetPassword) => {
  const { email, confirmCode, newPassword } = props;
  const params: ConfirmForgotPasswordCommandInput = {
    ClientId: EnvConfigs.COGNITO_APP_CLIENT_ID,
    Username: email,
    ConfirmationCode: confirmCode,
    Password: newPassword,
  };

  return await cognitoClient.send(new ConfirmForgotPasswordCommand(params));
};

export const logoutUser = async (accessToken: string) => {
  const command = new GlobalSignOutCommand({
    AccessToken: accessToken,
  });

  return await cognitoClient.send(command);
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
