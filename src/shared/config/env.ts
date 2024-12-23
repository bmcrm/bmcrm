export const EnvConfigs = {
  AWS_REGION: import.meta.env.VITE_REGION || 'us-east-1',
  COGNITO_APP_CLIENT_ID: import.meta.env.VITE_COGNITO_APP_CLIENT_ID || '',
  COGNITO_AWS_POOL_ID: import.meta.env.VITE_COGNITO_AWS_POOL_ID || '',
  TEST_ACCOUNT_TCO_EMAIL: import.meta.env.VITE_TEST_ACCOUNT_TCO_EMAIL || '',
  TEST_ACCOUNT_TCO_PASSWORD: import.meta.env.VITE_TEST_ACCOUNT_TCO_PASSWORD || '',
  CAMPERS_API_URL: import.meta.env.VITE_CAMPERS_API_URL || '',
  BMCRM_ENV: import.meta.env.VITE_BMCRM_ENV || '',
};
