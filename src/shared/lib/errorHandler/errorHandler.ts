import { isAxiosError } from 'axios';
import toast from 'react-hot-toast';
import * as Sentry from '@sentry/react';
import { logger, LogLevel, LogSource } from '@shared/lib/logger';

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

export const errorHandler = (error: unknown) => {
  let errorMessage = 'Oops, something went wrong! Try again later!';

  if (error instanceof Error) {
    if (error.name in ErrorNames) {
      errorMessage = errorsNames[error.name as ErrorNames];
    } else if (isAxiosError(error) && error.response?.data?.name in ErrorNames) {
      errorMessage = errorsNames[error.response?.data.name as ErrorNames];
    } else if (error.message) {
      errorMessage = error.message;
    }

    Sentry.captureMessage(`${error.name || 'UnknownError'}: ${error.message}`);
    logger(LogLevel.ERROR, LogSource.WEBAPP, error.message, { message: error.message });
  } else {
    console.error('Unknown error object:', error);
  }

  toast.error(errorMessage, {
    duration: 4000,
    position: 'top-right',
  });
};