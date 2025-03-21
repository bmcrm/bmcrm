import { useMutation } from '@tanstack/react-query';
import { errorHandler } from '@shared/lib/errorHandler';
import { filesApi } from '@shared/api/filesApi';

export const useUploadFileToS3 = () => {
	const { mutate, mutateAsync, isPending } = useMutation({
		mutationFn: filesApi.uploadFileToS3,
		onError: (error) => {
			console.error('error in s3:', error);
			errorHandler(error);
		},
	});

	return { mutate, mutateAsync, isPending };
};