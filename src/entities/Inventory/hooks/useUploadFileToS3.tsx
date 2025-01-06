import { useMutation } from '@tanstack/react-query';
import { errorHandler } from '@shared/lib/errorHandler';
import { inventoryApi } from '../api/inventoryApi';

const useUploadFileToS3 = () => {
	const { mutate, mutateAsync, isPending } = useMutation({
		mutationFn: inventoryApi.uploadFileToS3,
		onError: (error) => errorHandler(error),
	});

	return { mutate, mutateAsync, isPending };
};

export { useUploadFileToS3 };

// const uploadFileToS3 = async (file: File, uploadURL: string) => {
// 	const result = await fetch(uploadURL, {
// 		method: 'PUT',
// 		headers: {
// 			'Content-Type': 'image/png',
// 		},
// 		body: file,
// 	});
//
// 	if (!result.ok) {
// 		throw new Error('File upload failed');
// 	}
// };