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
  SignUpCommand,
  SignUpCommandInput,
} from '@aws-sdk/client-cognito-identity-provider';
import { EnvConfigs } from 'shared/config/env/env';
import {
  type IConfirmEmail,
  type IConfirmResetPass,
  type IInviteData,
  type ILoginData,
  type IUserRegisterData,
  useAuth,
} from 'entities/User';

import axiosInstance from 'shared/config/axios';
import socialLinksParser from 'shared/lib/socialLinkParser/socialLinkParser';

const cognitoClient = new CognitoIdentityProviderClient({
  region: EnvConfigs.AWS_REGION,
});

const mode = EnvConfigs.BMCRM_ENV;

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
    { Name: 'custom:city', Value: data.city || '' },
  ];

  const socialTransformedData = () => {
    if (!data?.social_links) {
      return JSON.stringify([]);
    }
    if (data?.social_links?.includes(', ')) {
      return JSON.stringify(socialLinksParser(data.social_links.split(', ')));
    }
    return JSON.stringify(socialLinksParser(data?.social_links));
  };

  const params: SignUpCommandInput = {
    ClientId: EnvConfigs.COGNITO_APP_CLIENT_ID,
    Username: data.email,
    Password: data.password,
    UserAttributes: userAttributes,
    ClientMetadata: {
      about_me: data?.about_me || '',
      social_links: data?.social_links ? socialTransformedData() : JSON.stringify([]),
    },
  };

  return await cognitoClient.send(new SignUpCommand(params));
};

export const inviteUser = async (data: IInviteData): Promise<unknown> => {
  return await axiosInstance.post(`https://api.${mode}.bmcrm.camp/campers`, data, {
    headers: {
      Authorization: useAuth.getState().idToken,
    },
  });
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
