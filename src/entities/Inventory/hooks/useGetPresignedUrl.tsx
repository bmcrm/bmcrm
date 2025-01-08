import { useMutation } from '@tanstack/react-query';
import { errorHandler } from '@shared/lib/errorHandler';
import { inventoryApi } from '../api/inventoryApi';

const useGetPresignedUrl = () => {
	const { mutate, mutateAsync, isPending } = useMutation({
		mutationFn: inventoryApi.getPresignedUrl,
		onError: (error) => errorHandler(error),
	});

	return { mutate, mutateAsync, isPending };
};

export { useGetPresignedUrl };