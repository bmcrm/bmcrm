import axios from 'axios';
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
import { createAuthHeaders } from '@shared/lib/createAuthHeaders';
import { EnvConfigs } from '@shared/config/env';
import { CAMPER_ENDPOINT } from '@shared/const/endpoints';
import {
	ICamperRegistrationData,
	IConfirmRegistration,
	IConfirmResetPassData,
	IInitResetPassData,
	ILoginData,
	ITCORegistrationData,
} from '../model/types/User.types';

const cognitoClient = new CognitoIdentityProviderClient({
	region: EnvConfigs.AWS_REGION,
});

export const userApi = {
	registration: async (credentials: ITCORegistrationData | ICamperRegistrationData) => {
		const endpoint = `${CAMPER_ENDPOINT}/create`;
		const headers = createAuthHeaders();

		const response = await axios.post(endpoint, credentials, { headers });

		return response.data;
	},
	confirmRegistration: async ({ email, code }: IConfirmRegistration) => {
		try {
			const params: ConfirmSignUpCommandInput = {
				ClientId: EnvConfigs.COGNITO_APP_CLIENT_ID,
				Username: email,
				ConfirmationCode: code,
			};

			return await cognitoClient.send(new ConfirmSignUpCommand(params));
		} catch (e) {
			console.error('error in confirmation api:', e);
		}
	},
	login: async ({ email, password }: ILoginData) => {
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
	},
	logout: async (accessToken: string) => {
		const command = new GlobalSignOutCommand({
			AccessToken: accessToken,
		});

		return await cognitoClient.send(command);
	},
	initResetPassword: async ({ email }: IInitResetPassData) => {
		const params: ForgotPasswordCommandInput = {
			ClientId: EnvConfigs.COGNITO_APP_CLIENT_ID,
			Username: email,
		};

		return await cognitoClient.send(new ForgotPasswordCommand(params));
	},
	confirmResetPassword: async (data: IConfirmResetPassData) => {
		const { code, email, password } = data;
		const params: ConfirmForgotPasswordCommandInput = {
			ClientId: EnvConfigs.COGNITO_APP_CLIENT_ID,
			ConfirmationCode: code,
			Username: email,
			Password: password,
		};

		return await cognitoClient.send(new ConfirmForgotPasswordCommand(params));
	},
	refreshTokens: async (refreshToken: string) => {
		const params: InitiateAuthCommandInput = {
			AuthFlow: AuthFlowType.REFRESH_TOKEN_AUTH,
			ClientId: EnvConfigs.COGNITO_APP_CLIENT_ID,
			AuthParameters: {
				REFRESH_TOKEN: refreshToken,
			},
		};

		const response = await cognitoClient.send(new InitiateAuthCommand(params));

		return response.AuthenticationResult;
	},
};