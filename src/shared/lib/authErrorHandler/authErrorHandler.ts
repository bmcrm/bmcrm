import { CognitoIdentityProviderServiceException } from '@aws-sdk/client-cognito-identity-provider';
import toast from 'react-hot-toast';

enum ErrorNames {
  USER_NOT_FOUND = 'UserNotFoundException',
  USER_NOT_AUTHORIZED = 'NotAuthorizedException',
  USER_NOT_CONFIRMED = 'UserNotConfirmedException',
  USER_ALREADY_EXIST = 'UsernameExistsException',
  INVALID_CODE = 'CodeMismatchException',
}

const errorsNames: { [key: string]: string } = {
  [ErrorNames.USER_NOT_FOUND]: 'User does not exist!',
  [ErrorNames.USER_NOT_AUTHORIZED]: 'Incorrect username or password!',
  [ErrorNames.USER_NOT_CONFIRMED]: 'Email is not confirmed!',
  [ErrorNames.USER_ALREADY_EXIST]: 'User already exist!',
  [ErrorNames.INVALID_CODE]: 'Invalid verification code provided, please try again!',
};

const errorHandler = (error: CognitoIdentityProviderServiceException) => {
  const errorMessage = errorsNames[error.name] || 'Oops, something wrong! Try again later!';

  toast.error(errorMessage, { duration: 4000, position: 'top-center' });
};

export default errorHandler;
