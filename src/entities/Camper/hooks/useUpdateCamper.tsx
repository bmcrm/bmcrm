import { useMutation, useQueryClient } from '@tanstack/react-query';
import { errorHandler } from '@shared/lib/errorHandler';
import { camperApi } from '../api/camperApi';
import { camperKeys } from '../model/const/camperKeys';
import type { ICamper } from '../model/types/Camper.types';

const useUpdatePractice = () => {
	const queryClient = useQueryClient();

	const { mutate, mutateAsync, isPending, isSuccess, isError } = useMutation({
		mutationFn: camperApi.updateCamper,
		onMutate: async (updatedCamper: Partial<ICamper>) => {
			await queryClient.cancelQueries({ queryKey: camperKeys.currentCamper(updatedCamper.email!) });

			const previousCamper = queryClient.getQueryData<ICamper>(camperKeys.currentCamper(updatedCamper.email!));

			queryClient.setQueryData<Partial<ICamper>>(camperKeys.currentCamper(updatedCamper.email!), (oldCamper) => {
				if (!oldCamper) return oldCamper;

				return {
					...oldCamper,
					...updatedCamper,
				};
			});

			return { previousCamper };
		},
		onError: (error, _, context) => {
			if (context?.previousCamper) {
				queryClient.setQueryData(camperKeys.currentCamper(context.previousCamper.email), context.previousCamper);
			}
			errorHandler(error);
		},
		onSettled: (data) => queryClient.invalidateQueries({ queryKey: camperKeys.currentCamper(data?.email!) }),
	});

	return { mutate, mutateAsync, isPending, isSuccess, isError };
};

export { useUpdatePractice };