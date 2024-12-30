import { useMutation, useQueryClient } from '@tanstack/react-query';
import { errorHandler } from '@shared/lib/errorHandler';
import { camperApi } from '../api/camperApi';
import { camperKeys } from '../model/const/camperKeys';

const useInviteCamper = () => {
	const queryClient = useQueryClient();

	const { mutate, mutateAsync, isPending, isSuccess, isError } = useMutation({
		mutationFn: camperApi.inviteCamper,
		onError: (error) => errorHandler(error),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: camperKeys.allCampers }),
	});

	return { mutate, mutateAsync, isPending, isSuccess, isError };
};

export { useInviteCamper };