import { useMutation } from '@tanstack/react-query';
import { errorHandler } from '@shared/lib/errorHandler';
import { inventoryApi } from '../api/inventoryApi';

const useUploadFileToS3 = () => {
	const { mutate, mutateAsync, isPending } = useMutation({
		mutationFn: inventoryApi.uploadFileToS3,
		onError: (error) => {
			console.error('error in s3:', error);
			errorHandler(error);
		},
	});

	return { mutate, mutateAsync, isPending };
};

export { useUploadFileToS3 };