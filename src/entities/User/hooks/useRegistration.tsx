import { useMutation } from '@tanstack/react-query';
import { useToast } from '@shared/hooks/useToast';
import { errorHandler } from '@shared/lib/errorHandler';
import { logger, LogLevel, LogSource } from '@shared/lib/logger';
import { userApi } from '../api/userApi';
import { type IRegisterPayload, IRegistrationStage } from '../model/types/UseRegistration.types';
import type { IConfirmRegistration, ITCORegistrationData, ICamperRegistrationData } from '../model/types/User.types';

const useRegistration = () => {
	const { success } = useToast();

	const stages: {
		[Key in IRegistrationStage]: {
			api: (data: Key extends IRegistrationStage.REGISTRATION_TCO
				? ITCORegistrationData
				: Key extends IRegistrationStage.REGISTRATION_CAMPER
					? ICamperRegistrationData
					: IConfirmRegistration) => Promise<unknown>;
			toast: () => void;
		};
	} = {
		[IRegistrationStage.REGISTRATION_TCO]: {
			api: userApi.registration,
			toast: () => success('Sign-up successful! We have sent you a verification code to your email, it is valid for 24 hours.'),
		},
		[IRegistrationStage.REGISTRATION_CAMPER]: {
			api: userApi.registration,
			toast: () => success('Sign-up successful! We have sent you a verification code to your email, it is valid for 24 hours.'),
		},
		[IRegistrationStage.CONFIRMATION]: {
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
			const isTCO = variables.stage === IRegistrationStage.REGISTRATION_TCO;
			const isConfirmation = variables.stage === IRegistrationStage.CONFIRMATION;

			toast();

			if (isConfirmation) {
				logger(LogLevel.INFO, LogSource.WEBAPP, 'User confirmed', {
					user: variables.data.email,
				});
			} else {
				logger(LogLevel.INFO, LogSource.WEBAPP, `New user registered as ${isTCO ? 'TCO' : 'Camper'}`, {
					user: variables.data.email,
					...(isTCO ? { camp_id: (variables.data as ITCORegistrationData).camp_id } : {}),
				});
			}
		},
		onError: (error, variables) => {
			errorHandler(error);

			if (
				variables.stage === IRegistrationStage.REGISTRATION_CAMPER
				|| variables.stage === IRegistrationStage.REGISTRATION_TCO
			) {
				const { email, camp_id, camp_name, playa_name } = variables.data as ICamperRegistrationData;

				logger(LogLevel.ERROR, LogSource.WEBAPP, 'Error during registration', {
					user: email,
					playa_name,
					camp_id,
					camp_name,
				});
			}

			if (variables.stage === IRegistrationStage.CONFIRMATION) {
				const { email } = variables.data as IConfirmRegistration;

				logger(LogLevel.ERROR, LogSource.WEBAPP, 'Error during confirmation', {
					user: email,
				});
			}
		},
	});

	return { mutate, mutateAsync, isPending, isSuccess, isError };
};

export { useRegistration };