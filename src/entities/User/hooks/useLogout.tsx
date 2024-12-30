import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@shared/hooks/useToast';
import { useLocalStorage } from '@shared/hooks/useLocalStorage';
import { userApi } from '../api/userApi';
import { userState } from '../model/state/userState';

const useLogout = () => {
	const queryClient = useQueryClient();
	const { resetState: resetOrgState, tokens: { accessToken } } = userState();
	const { clearStorage } = useLocalStorage();
	const { success } = useToast();

	const { mutate, isPending, isSuccess, isError } = useMutation({
		mutationFn: () => userApi.logout(accessToken),
		onMutate: () => {
			clearStorage();
			resetOrgState();

			queryClient.clear();
			success('Logged Out');
		},
	});

	return { mutate, isPending, isSuccess, isError };
};

export { useLogout };