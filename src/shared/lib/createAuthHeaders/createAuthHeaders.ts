import { userState } from '@entities/User';

export const createAuthHeaders = () => {
  const idToken = userState.getState().tokens.idToken;

  return {
    'Content-Type': 'application/json',
    Authorization: idToken,
  };
};