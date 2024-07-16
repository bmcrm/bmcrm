import { CognitoIdentityProviderServiceException } from '@aws-sdk/client-cognito-identity-provider';
import toast from 'react-hot-toast';
import * as Sentry from '@sentry/react';
import { AxiosError } from 'axios';
import { logger, LogLevel, LogSource } from '../logger/logger';

enum ErrorNames {
  USER_NOT_FOUND = 'UserNotFoundException',
  USER_NOT_AUTHORIZED = 'NotAuthorizedException',
  USER_NOT_CONFIRMED = 'UserNotConfirmedException',
  USER_ALREADY_EXIST = 'UsernameExistsException',
  CAMP_ID_ALREADY_EXIST = 'CampIdExistsException',
  INVALID_CODE = 'CodeMismatchException',
  INVALID_PASSWORD = 'InvalidPasswordException',
}

const errorsNames: { [key in ErrorNames]: string } = {
  [ErrorNames.USER_NOT_FOUND]: 'User does not exist!',
  [ErrorNames.USER_NOT_AUTHORIZED]: 'Incorrect username or password!',
  [ErrorNames.USER_NOT_CONFIRMED]: 'Email is not confirmed!',
  [ErrorNames.USER_ALREADY_EXIST]: 'User already exist!',
  [ErrorNames.CAMP_ID_ALREADY_EXIST]: 'Such Camp ID already exists, please choose another one!',
  [ErrorNames.INVALID_CODE]: 'Invalid verification code provided, please try again!',
  [ErrorNames.INVALID_PASSWORD]: 'Please, add to your password special character! [!@#$%^&*()]',
};

const errorHandler = (
  error: CognitoIdentityProviderServiceException | AxiosError | Error,
  page: string = '',
  details: string = '',
  user: string = ''
) => {
  let errorMessage = errorsNames[error.name as ErrorNames];
  Sentry.captureMessage(`${error.name}: ${error.message}`);
  logger(LogLevel.ERROR, LogSource.WEBAPP, error.message, {
    user,
    message: error.message,
    page,
    details,
  });
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
  if (error.name !== ErrorNames.USER_NOT_CONFIRMED) {
    toast.error(errorMessage, { duration: 4000, position: 'top-center' });
  }
};

export default errorHandler;
