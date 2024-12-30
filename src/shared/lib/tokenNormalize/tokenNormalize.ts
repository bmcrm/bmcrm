import type { IIDToken } from '@entities/User';

export const tokenNormalize = (token: IIDToken): IIDToken => {
  const normalizedToken: Partial<IIDToken> = {};

  Object.keys(token).forEach(key => {
    const newKey = key.startsWith('custom:') ? key.replace('custom:', '') : key;
    (normalizedToken[newKey as keyof IIDToken] as string | number | boolean | undefined) = token[key as keyof IIDToken];
  });

  return normalizedToken as IIDToken;
};