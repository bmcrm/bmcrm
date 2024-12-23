/*
import {
  AuthFlowType,
  CognitoIdentityProviderClient,
  ConfirmForgotPasswordCommand,
  ConfirmForgotPasswordCommandInput,
  ConfirmSignUpCommand,
  ConfirmSignUpCommandInput,
  ForgotPasswordCommand,
  ForgotPasswordCommandInput,
  GlobalSignOutCommand,
  InitiateAuthCommand,
  InitiateAuthCommandInput,
} from '@aws-sdk/client-cognito-identity-provider';
import { EnvConfigs } from 'shared/config/env/env';
import {
  type IConfirmEmail,
  type IConfirmResetPass,
  type IInviteData,
  type ILoginData,
  IUserRegisterData,
  useAuth,
} from 'entities/User';

import axiosInstance from 'shared/config/axios';
import { ITCORegisterForm } from 'entities/User/model/types/auth.types';

const cognitoClient = new CognitoIdentityProviderClient({
  region: EnvConfigs.AWS_REGION,
});

const mode = EnvConfigs.BMCRM_ENV;

export const inviteUser = async (data: IInviteData): Promise<unknown> => {
  return await axiosInstance.post(`https://api.${mode}.bmcrm.camp/campers`, data, {
    headers: {
      Authorization: useAuth.getState().idToken,
    },
  });
};

export const signUp = async (credentials: ITCORegisterForm | IUserRegisterData) => {
  await axiosInstance.post(`https://api.${mode}.bmcrm.camp/campers/create`, credentials);
};

export const loginUser = async ({ email, password }: ILoginData) => {
  const params: InitiateAuthCommandInput = {
    AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
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
  const params: ConfirmSignUpCommandInput = {
    ClientId: EnvConfigs.COGNITO_APP_CLIENT_ID,
    Username: email,
    ConfirmationCode: code,
  };

  return await cognitoClient.send(new ConfirmSignUpCommand(params));
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

export const refreshUserTokens = async (refreshToken: string) => {
  const params = {
    AuthFlow: AuthFlowType.REFRESH_TOKEN_AUTH,
    ClientId: EnvConfigs.COGNITO_APP_CLIENT_ID,
    AuthParameters: {
      REFRESH_TOKEN: refreshToken,
    },
  };

  const response = await cognitoClient.send(new InitiateAuthCommand(params));

  return response.AuthenticationResult;
};
*/
