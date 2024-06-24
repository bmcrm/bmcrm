import { CognitoIdentityProviderServiceException } from '@aws-sdk/client-cognito-identity-provider';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';

enum ErrorNames {
  USER_NOT_FOUND = 'UserNotFoundException',
  USER_NOT_AUTHORIZED = 'NotAuthorizedException',
  USER_NOT_CONFIRMED = 'UserNotConfirmedException',
  USER_ALREADY_EXIST = 'UsernameExistsException',
  CAMP_ID_ALREADY_EXIST = 'CampIdExistsException',
  INVALID_CODE = 'CodeMismatchException',
}

const errorsNames: { [key in ErrorNames]: string } = {
  [ErrorNames.USER_NOT_FOUND]: 'User does not exist!',
  [ErrorNames.USER_NOT_AUTHORIZED]: 'Incorrect username or password!',
  [ErrorNames.USER_NOT_CONFIRMED]: 'Email is not confirmed!',
  [ErrorNames.USER_ALREADY_EXIST]: 'User already exist!',
  [ErrorNames.CAMP_ID_ALREADY_EXIST]: 'Such Camp ID already exists, please choose another one!',
  [ErrorNames.INVALID_CODE]: 'Invalid verification code provided, please try again!',
};

const errorHandler = (error: CognitoIdentityProviderServiceException | AxiosError | Error) => {
  let errorMessage = errorsNames[error.name as ErrorNames];

  if (!errorMessage && error.message) {
    for (const key in ErrorNames) {
      if (error.message.includes(ErrorNames[key as keyof typeof ErrorNames])) {
        errorMessage = errorsNames[ErrorNames[key as keyof typeof ErrorNames]];
        break;
      }
    }
  }

  if (!errorMessage) {
    errorMessage = 'Oops, something went wrong! Try again later!';
  }

  toast.error(errorMessage, { duration: 4000, position: 'top-center' });
};

export default errorHandler;