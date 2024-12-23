import { useMutation } from '@tanstack/react-query';
import { jwtDecode } from 'jwt-decode';
import { errorHandler } from '@shared/lib/errorHandler';
import { tokenNormalize } from '@shared/lib/tokenNormalize';
import { userApi } from '../api/userApi';
import { userState } from '../model/state/userState';
import type { IIDToken } from '../model/types/User.types';

const useLogin = () => {
	const { set } = userState();

	const { mutate, mutateAsync, isPending, isSuccess, isError } = useMutation({
		mutationFn: userApi.login,
		onSuccess: (response) => {
			if (response) {
				const { IdToken, AccessToken, RefreshToken } = response;
				const decodedToken = jwtDecode<IIDToken>(IdToken || '');
				const normalizedToken = tokenNormalize(decodedToken);

				set({
					isLoggedIn: true,
					tokens: {
						accessToken: AccessToken || '',
						refreshToken: RefreshToken || '',
						idToken: IdToken || '',
						decodedIDToken: normalizedToken,
					},
				});
			}
		},
		onError: (error) => errorHandler(error),
	});

	return { mutate, mutateAsync, isPending, isSuccess, isError };
};

export { useLogin };