export const EnvConfigs = {
  AWS_REGION: import.meta.env.VITE_REGION || 'us-east-1',
  COGNITO_APP_CLIENT_ID: import.meta.env.VITE_COGNITO_APP_CLIENT_ID || '',
  COGNITO_AWS_POOL_ID: import.meta.env.VITE_COGNITO_AWS_POOL_ID || '',
  BMCRM_ENV: import.meta.env.VITE_BMCRM_ENV || '',
  MODELS_CLOUDFRONT_BASE_URL: import.meta.env.VITE_MODELS_CLOUDFRONT_BASE_URL || '',
};
