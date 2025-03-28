import { useMutation } from '@tanstack/react-query';
import { useToast } from '@shared/hooks/useToast';
import { errorHandler } from '@shared/lib/errorHandler';
import { logger, LogLevel, LogSource } from '@shared/lib/logger';
import { userApi } from '../api/userApi';
import type { IInitResetPassData, IConfirmResetPassData } from '../model/types/User.types';
import { IResetPassStages, type IResetPassPayload } from '../model/types/UseResetPassword.types';

const useResetPassword = () => {
	const { success } = useToast();

	const stages: {
		[Key in IResetPassStages]: {
			api?: (data: Key extends IResetPassStages.INIT
				? IInitResetPassData
				: IConfirmResetPassData) => Promise<unknown>;
			toast?: () => void;
		};
	} = {
		[IResetPassStages.INIT]: {
			api: userApi.initResetPassword,
			toast: () => success('Check your email!'),
		},
		[IResetPassStages.CONFIRM]: {
			api: userApi.confirmResetPassword,
		},
		[IResetPassStages.SUCCESS]: {},
	};

	const { mutate, mutateAsync, isPending, isSuccess, isError } = useMutation({
		mutationFn: async (payload: IResetPassPayload) => {
			const { api } = stages[payload.stage];
			return api?.(payload.data as never);
		},
		onSuccess: (_, variables) => {
			const { toast } = stages[variables.stage];
			toast?.();
		},
		onError: (error, variables) => {
			errorHandler(error);
			logger(LogLevel.ERROR, LogSource.WEBAPP, 'Error during reset password', { user: variables.data.email });
		},
	});

	return { mutate, mutateAsync, isPending, isSuccess, isError };
};

export { useResetPassword };