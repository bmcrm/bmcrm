import { SSMClient, GetParametersByPathCommand } from '@aws-sdk/client-ssm';

async function loadEnvFromSSM() {
  const client = new SSMClient({ region: 'us-east-1' });

  const command = new GetParametersByPathCommand({
    Path: '/webapp/test/tco_email',
    Recursive: true,
    WithDecryption: true,
  });

  try {
    const response = await client.send(command);
    const parameters = response.Parameters;

    const env: Record<string, string> = {};
    for (const param of parameters || []) {
      const paramName = param.Name?.split('/').pop();
      const paramValue = param.Value;

      if (paramName && paramValue) {
        env[paramName] = paramValue;
      }
    }

    return env;
  } catch (error) {
    console.error('Error loading environment variables from SSM:', error);
    return {};
  }
}

export default loadEnvFromSSM;
