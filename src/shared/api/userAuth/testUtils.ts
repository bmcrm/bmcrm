import { SSMClient, GetParameterCommand } from '@aws-sdk/client-ssm';
import {
  CognitoIdentityProviderClient,
  AdminCreateUserCommand,
  MessageActionType,
  AdminInitiateAuthCommand,
  AuthFlowType,
  RespondToAuthChallengeCommand,
  AdminDeleteUserCommand,
  ChallengeNameType,
} from '@aws-sdk/client-cognito-identity-provider';
import { DynamoDBClient, DeleteItemCommand, DeleteItemCommandInput } from '@aws-sdk/client-dynamodb';

const cognitoClient = new CognitoIdentityProviderClient({
  region: 'us-east-1',
});

const client = new SSMClient({ region: 'us-east-1' });

export async function getParameter(name: string): Promise<string> {
  const resp = client.send(new GetParameterCommand({ Name: name }));
  return resp.then(r => r.Parameter?.Value || '');
}

export async function createUser(
  testCognitoPoolId: string,
  testEmail: string,
  campId: string,
  tempPassword: string,
  userRole: string
): Promise<void> {
  const params = {
    UserPoolId: testCognitoPoolId,
    Username: testEmail,
    UserAttributes: [
      {
        Name: 'email',
        Value: testEmail,
      },
      {
        Name: 'custom:camp_id',
        Value: campId,
      },
      {
        Name: 'custom:role',
        Value: userRole,
      },
    ],
    TemporaryPassword: tempPassword,
    MessageAction: MessageActionType.SUPPRESS,
  };

  try {
    const command = new AdminCreateUserCommand(params);
    await cognitoClient.send(command);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function initiateAuth(
  testCognitoPoolId: string,
  cognitoAppClientId: string,
  testEmail: string,
  tempPassword: string,
  newPassword: string
): Promise<void> {
  const params = {
    UserPoolId: testCognitoPoolId,
    ClientId: cognitoAppClientId,
    AuthFlow: AuthFlowType.ADMIN_USER_PASSWORD_AUTH,
    AuthParameters: {
      USERNAME: testEmail,
      PASSWORD: tempPassword,
    },
  };

  try {
    const command = new AdminInitiateAuthCommand(params);
    const response = await cognitoClient.send(command);

    if (response.ChallengeName === ChallengeNameType.NEW_PASSWORD_REQUIRED) {
      const challengeResponse = {
        UserPoolId: testCognitoPoolId,
        ClientId: cognitoAppClientId,
        ChallengeName: ChallengeNameType.NEW_PASSWORD_REQUIRED,
        Session: response.Session,
        ChallengeResponses: {
          USERNAME: testEmail,
          NEW_PASSWORD: newPassword,
        },
      };

      const respondCommand = new RespondToAuthChallengeCommand(challengeResponse);
      await cognitoClient.send(respondCommand);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteUser(
  testCognitoPoolId: string,
  username: string,
  campId: string,
  tableName: string
): Promise<void> {
  const params = {
    UserPoolId: testCognitoPoolId,
    Username: username,
  };
  const paramsDDB: DeleteItemCommandInput = {
    TableName: tableName,
    Key: {
      camp_id: { S: campId },
      email: { S: username },
    },
  };
  const dynamoDBClient = new DynamoDBClient({});

  try {
    await dynamoDBClient.send(new DeleteItemCommand(paramsDDB));
  } catch (err) {
    console.error('Error deleting camper:', err);
    throw err;
  }

  try {
    const command = new AdminDeleteUserCommand(params);
    await cognitoClient.send(command);
  } catch (error) {
    console.error('Error deleting user', error);
    throw error;
  }
}
