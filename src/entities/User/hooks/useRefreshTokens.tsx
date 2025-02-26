import { useMutation } from '@tanstack/react-query';
import { jwtDecode } from 'jwt-decode';
import { errorHandler } from '@shared/lib/errorHandler';
import { tokenNormalize } from '@shared/lib/tokenNormalize';
import { useLocalStorage } from '@shared/hooks/useLocalStorage';
import { userApi } from '../api/userApi';
import { userState } from '../model/state/userState';
import { userKeys } from '../model/const/userKeys';
import { localStorageVars } from '@shared/const/localStorage';
import type { IIDToken } from '../model/types/User.types';

const useRefreshTokens = () => {
	const { set } = userState();
	const { removeStorage } = useLocalStorage();

	const { mutate, isPending, isSuccess, isError } = useMutation({
		mutationKey: userKeys.tokens,
		mutationFn: userApi.refreshTokens,
		retry: 0,
		onSuccess: (response, refreshToken) => {
			if (response) {
				const { IdToken, AccessToken, RefreshToken } = response;
				const decodedToken = jwtDecode<IIDToken>(IdToken || '');
				const normalizedToken = tokenNormalize(decodedToken);

				set({
					tokens: {
						accessToken: AccessToken || '',
						idToken: IdToken || '',
						refreshToken: RefreshToken || refreshToken,
						decodedIDToken: normalizedToken,
					},
				});
			}
		},
		onError: (error) => {
			removeStorage(localStorageVars.AUTH);
			errorHandler(error);
		},
	});

	return { mutate, isPending, isSuccess, isError };
};

export { useRefreshTokens };