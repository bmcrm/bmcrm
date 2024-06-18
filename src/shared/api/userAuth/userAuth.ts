import {
  CognitoIdentityProviderClient,
  ConfirmForgotPasswordCommand,
  ConfirmForgotPasswordCommandInput,
  ConfirmSignUpCommand,
  ForgotPasswordCommand,
  ForgotPasswordCommandInput,
  GlobalSignOutCommand,
  InitiateAuthCommand,
  InitiateAuthCommandInput,
  SignUpCommand,
  SignUpCommandInput,
} from '@aws-sdk/client-cognito-identity-provider';
import { EnvConfigs } from 'shared/config/env/env';
import {
  type IConfirmEmail,
  type IConfirmResetPass,
  type IInviteData,
  type ILoginData,
  type IUserRegisterData
} from 'entities/User';

const cognitoClient = new CognitoIdentityProviderClient({
  region: EnvConfigs.AWS_REGION,
});

export const signUpUser = async (data: IUserRegisterData) => {
  const userAttributes = [
    { Name: 'email', Value: data.email },
    { Name: 'custom:created_at', Value: new Date().getTime().toString() },
    { Name: 'updated_at', Value: new Date().getTime().toString() },
    { Name: 'custom:first_name', Value: data.first_name },
    { Name: 'custom:last_name', Value: data.last_name },
    { Name: 'custom:playa_name', Value: data.playa_name },
    { Name: 'custom:role', Value: data.role },
    { Name: 'custom:camp_id', Value: data.camp_id },
    { Name: 'custom:camp_website', Value: data.camp_website || '' },
    { Name: 'custom:camp_name', Value: data.camp_name || '' },
    { Name: 'custom:city', Value: data.city || '' }
  ];

  const params: SignUpCommandInput = {
    ClientId: EnvConfigs.COGNITO_APP_CLIENT_ID,
    Username: data.email,
    Password: data.password,
    UserAttributes: userAttributes,
  };

  return await cognitoClient.send(new SignUpCommand(params));
};

export const inviteUser = async (data: IInviteData) => {
  console.log(data);

  return true;
};

export const loginUser = async ({ email, password }: ILoginData) => {
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

export const confirmEmail = async ({ email, code }: IConfirmEmail) => {
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

export const confirmResetPassword = async (props: IConfirmResetPass) => {
  const { email, confirm_code, password_new } = props;
  const params: ConfirmForgotPasswordCommandInput = {
    ClientId: EnvConfigs.COGNITO_APP_CLIENT_ID,
    Username: email,
    ConfirmationCode: confirm_code,
    Password: password_new,
  };

  return await cognitoClient.send(new ConfirmForgotPasswordCommand(params));
};

export const logoutUser = async (accessToken: string) => {
  const command = new GlobalSignOutCommand({
    AccessToken: accessToken,
  });

  return await cognitoClient.send(command);
};
