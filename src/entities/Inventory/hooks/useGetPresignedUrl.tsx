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

// const getPresignedUrl = async (fileName: string) => {
// 	const response = await fetch(`https://api.${mode}.bmcrm.camp/inventory/upload`, {
// 		method: 'POST',
// 		headers: {
// 			'Content-Type': 'application/json',
// 			Authorization: token,
// 		},
// 		body: JSON.stringify({ fileName }),
// 	});
//
// 	const data = await response.json();
// 	return data.uploadURL;
// };