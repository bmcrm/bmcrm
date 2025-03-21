import { useMutation } from '@tanstack/react-query';
import { errorHandler } from '@shared/lib/errorHandler';
import { filesApi } from '@shared/api/filesApi';

export const useGetPresignedUrl = () => {
	const { mutate, mutateAsync, isPending } = useMutation({
		mutationFn: filesApi.getPresignedUrl,
		onError: (error) => errorHandler(error),
	});

	return { mutate, mutateAsync, isPending };
};