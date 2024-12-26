import { useMutation, useQueryClient } from '@tanstack/react-query';
import { errorHandler } from '@shared/lib/errorHandler';
import { campApi } from '../api/campApi';
import { campKeys } from '../model/const/campKeys';
import type { ICamp } from '../model/types/Camp.types.ts';

const useUpdateCamp = () => {
	const queryClient = useQueryClient();

	const { mutate, mutateAsync, isPending, isSuccess, isError } = useMutation({
		mutationFn: campApi.updateCamp,
		onMutate: async (updatedCamp: Partial<ICamp>) => {
			await queryClient.cancelQueries({ queryKey: campKeys.currentCamp });

			const previousCamp = queryClient.getQueryData<ICamp>(campKeys.currentCamp(updatedCamp.camp_id!));

			queryClient.setQueryData<Partial<ICamp>>(campKeys.currentCamp(updatedCamp.camp_id!), (oldCamp) => {
				if (!oldCamp) return oldCamp;

				return {
					...oldCamp,
          ...updatedCamp,
				};
			});

			return { previousCamp };
		},
		onError: (error, _, context) => {
			if (context?.previousCamp) {
				queryClient.setQueryData(campKeys.currentCamp(context.previousCamp.camp_id), context.previousCamp);
			}
			errorHandler(error);
		},
		onSettled: () => queryClient.invalidateQueries({ queryKey: campKeys.currentCamp }),
	});

	return { mutate, mutateAsync, isPending, isSuccess, isError };
};

export { useUpdateCamp };