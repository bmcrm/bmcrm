import {
  CognitoIdentityProviderClient,
  SignUpCommand,
  SignUpCommandInput,
} from '@aws-sdk/client-cognito-identity-provider';

const REGION = import.meta.env.VITE_REGION;
const COGNITO_APP_CLIENT_ID = import.meta.env.VITE_COGNITO_APP_CLIENT_ID;

const cognitoClient = new CognitoIdentityProviderClient({
  region: REGION,
});
interface SignUpData {
  username: string
  password: string
  email: string
  campName: string
  campId: string
  city: string
  website: string
  firstName: string
  lastName: string
  playaName: string
}
export const signUpUser = async (userData: SignUpData): Promise<void> => {
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

  try {
    const data = await cognitoClient.send(new SignUpCommand(params));
    console.log('Sign up success', data);
  } catch (error) {
    console.error('Sign up failed', error);
  }
};
