import { SSMClient, GetParametersByPathCommand } from '@aws-sdk/client-ssm';

async function loadEnvFromSSM(paths: string[]) {
  const client = new SSMClient({ region: 'us-east-1' });

  const env: Record<string, string> = {};

  for (const path of paths) {
    const command = new GetParametersByPathCommand({
      Path: path,
      Recursive: true,
      WithDecryption: true,
    });

    try {
      const response = await client.send(command);
      const parameters = response.Parameters;

      for (const param of parameters || []) {
        const paramName = param.Name?.split('/').pop();
        const paramValue = param.Value;

        if (paramName && paramValue) {
          env[paramName] = paramValue;
        }
      }
    } catch (error) {
      console.error(`Error loading environment variables from SSM for path ${path}:`, error);
    }
  }

  return env;
}

export default loadEnvFromSSM;
