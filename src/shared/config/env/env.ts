import dotenv from 'dotenv';

dotenv.config();
export const EnvConfigs = {
  AWS_REGION: process.env.VITE_REGION || 'us-east-1',
  COGNITO_APP_CLIENT_ID: process.env.VITE_COGNITO_APP_CLIENT_ID || '',
  COGNITO_AWS_POOL_ID: process.env.VITE_COGNITO_AWS_POOL_ID || '',
  TEST_ACCOUNT_TCO_EMAIL: process.env.VITE_TEST_ACCOUNT_TCO_EMAIL || '',
  TEST_ACCOUNT_TCO_PASSWORD: process.env.VITE_TEST_ACCOUNT_TCO_PASSWORD || '',
};
