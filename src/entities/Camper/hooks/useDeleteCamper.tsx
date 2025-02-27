import { useMutation, useQueryClient } from '@tanstack/react-query';
import { errorHandler } from '@shared/lib/errorHandler';
import { camperApi } from '../api/camperApi';
import { camperKeys } from '../model/const/camperKeys';

const useDeleteCamper = () => {
	const queryClient = useQueryClient();

	const { mutate, mutateAsync, isPending, isSuccess, isError } = useMutation({
		mutationFn: camperApi.deleteCamper,
		onError: (error) => errorHandler(error),
		onSettled: () => queryClient.invalidateQueries({ queryKey: camperKeys.allCampers }),
	});

	return { mutate, mutateAsync, isPending, isSuccess, isError };
};

export { useDeleteCamper };