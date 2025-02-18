import { useMutation, useQueryClient } from '@tanstack/react-query';
import { errorHandler } from '@shared/lib/errorHandler';
import { camperApi } from '../api/camperApi';
import { camperKeys } from '../model/const/camperKeys';
import type { ICamper } from '../model/types/Camper.types';

const useUpdateCamper = () => {
	const queryClient = useQueryClient();

	const { mutate, mutateAsync, isPending, isSuccess, isError } = useMutation({
		mutationFn: camperApi.updateCamper,
		onMutate: async (updatedCamper: Partial<ICamper>) => {
			await queryClient.cancelQueries({ queryKey: camperKeys.allCampers });

			const previousCampers = queryClient.getQueryData<ICamper[]>(camperKeys.allCampers);

			queryClient.setQueryData<ICamper[]>(camperKeys.allCampers, (oldCampers) => {
				if (!oldCampers) return oldCampers;

				return oldCampers.map((camper) =>
					camper.email === updatedCamper.email
						? { ...camper, ...updatedCamper, updated_at: new Date().toISOString() }
						: camper
				);
			});

			return { previousCampers };
		},
		onError: (error, _, context) => {
			if (context?.previousCampers) {
				queryClient.setQueryData(camperKeys.allCampers, context.previousCampers);
			}
			errorHandler(error);
		},
		onSettled: () => queryClient.invalidateQueries({ queryKey: camperKeys.allCampers }),
	});

	return { mutate, mutateAsync, isPending, isSuccess, isError };
};

export { useUpdateCamper };