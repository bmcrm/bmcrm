import { useMutation } from '@tanstack/react-query';
import { useToast } from '@shared/hooks/useToast';
import { errorHandler } from '@shared/lib/errorHandler';
import { userApi } from '../api/userApi';
import { IRegisterStage, type IRegisterPayload, } from '../model/types/UseRegistration.types';
import type { IUserRegisterData, IConfirmRegistration } from '../model/types/User.types';

const useRegistration = () => {
	const { success } = useToast();

	const stages: {
		[Key in IRegisterStage]: {
			api: (data: Key extends IRegisterStage.REGISTRATION
				? IUserRegisterData
				: IConfirmRegistration) => Promise<unknown>;
			toast: () => void;
		};
	} = {
		[IRegisterStage.REGISTRATION]: {
			api: userApi.registration,
			toast: () => success('Check your email!'),
		},
		[IRegisterStage.CONFIRMATION]: {
			api: userApi.confirmRegistration,
			toast: () => success('Signed Up!'),
		},
	};

	const { mutate, mutateAsync, isPending, isSuccess, isError } = useMutation({
		mutationFn: async (payload: IRegisterPayload) => {
			const { api } = stages[payload.stage];
			return api(payload.data as never);
		},
		onSuccess: (_, variables) => {
			const { toast } = stages[variables.stage];
			toast();
		},
		onError: (error) => errorHandler(error),
	});

	return { mutate, mutateAsync, isPending, isSuccess, isError };
};

export { useRegistration };