import { isAxiosError } from 'axios';
import toast from 'react-hot-toast';
import * as Sentry from '@sentry/react';
import { CognitoIdentityProviderServiceException } from '@aws-sdk/client-cognito-identity-provider';
import { logger, LogLevel, LogSource } from '@shared/lib/logger';

enum ErrorNames {
  USER_NOT_FOUND = 'UserNotFoundException',
  USER_NOT_AUTHORIZED = 'NotAuthorizedException',
  USER_NOT_CONFIRMED = 'UserNotConfirmedException',
  USER_ALREADY_EXIST = 'UsernameExistsException',
  CAMP_ID_ALREADY_EXIST = 'CampIdExistsException',
  INVALID_CODE = 'CodeMismatchException',
  INVALID_PASSWORD = 'InvalidPasswordException',
  EMAIL_ALREADY_EXIST = 'Camper email already in use',
}

const errorsNames: { [key in ErrorNames]: string } = {
  [ErrorNames.USER_NOT_FOUND]: 'User does not exist!',
  [ErrorNames.USER_NOT_AUTHORIZED]: 'Incorrect username or password!',
  [ErrorNames.USER_NOT_CONFIRMED]: 'Email is not confirmed!',
  [ErrorNames.USER_ALREADY_EXIST]: 'User already exist!',
  [ErrorNames.CAMP_ID_ALREADY_EXIST]: 'Such Camp ID already exists, please choose another one!',
  [ErrorNames.INVALID_CODE]: 'Invalid verification code provided, please try again!',
  [ErrorNames.INVALID_PASSWORD]: 'Please, add to your password special character! [!@#$%^&*()]',
  [ErrorNames.EMAIL_ALREADY_EXIST]: 'Camper email already in use!',
};

export const errorHandler = (error: unknown) => {
  let errorMessage = 'Oops, something went wrong! Try again later!';

  if (error instanceof Error && error.name in ErrorNames) {
    errorMessage = errorsNames[error.name as ErrorNames];
  } else if (
    isAxiosError(error) &&
    error.response?.data &&
    typeof error.response.data === 'object'
  ) {
    const axiosErrorName = (error.response.data.name ?? error.response.data.error ?? error.response.data.code ?? '').trim();
    const axiosErrorMessage = (error.response.data.message ?? '').trim();

    if (Object.values(ErrorNames).includes(axiosErrorName as ErrorNames)) {
      errorMessage = errorsNames[axiosErrorName as ErrorNames];
    } else if (Object.values(ErrorNames).includes(axiosErrorMessage as ErrorNames)) {
      errorMessage = errorsNames[axiosErrorMessage as ErrorNames];
    }
  } else if (
    error instanceof CognitoIdentityProviderServiceException
    && Object.values(ErrorNames).includes(error.name as ErrorNames)
  ) {
    errorMessage = errorsNames[error.name as ErrorNames];
  }

  Sentry.captureMessage(`${(error as Error).name || 'UnknownError'}: ${(error as Error).message}`);
  logger(LogLevel.ERROR, LogSource.WEBAPP, (error as Error).message, { message: (error as Error).message });
  toast.error(errorMessage, {
    duration: 4000,
    position: 'top-right',
  });
};