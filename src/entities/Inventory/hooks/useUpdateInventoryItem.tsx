import { useMutation, useQueryClient } from '@tanstack/react-query';
import { errorHandler } from '@shared/lib/errorHandler';
import { useToast } from '@shared/hooks/useToast';
import { logger, LogLevel, LogSource } from '@shared/lib/logger';
import { useGetPresignedUrl } from './useGetPresignedUrl';
import { useUploadFileToS3 } from './useUploadFileToS3';
import { userState } from '@entities/User';
import { inventoryApi } from '../api/inventoryApi';
import { inventoryKeys } from '../model/const/inventoryKeys';
import type { IInventoryItem } from '../model/types/Inventory.types';

const useUpdateInventoryItem = () => {
	const { success, error } = useToast();
	const { tokens: { decodedIDToken } } = userState();
	const queryClient = useQueryClient();
	const { mutateAsync: getPresignedUrl } = useGetPresignedUrl();
	const { mutateAsync: uploadFileToS3 } = useUploadFileToS3();

	const { mutate, mutateAsync, isPending, isSuccess, isError } = useMutation({
		mutationFn: async (item: Partial<IInventoryItem & { files: File[] }>) => {
			const { files, images, ...rest } = item;
			const uploadedImageUrls: string[] = [];

			if (files && files.length > 0) {
				const results = await Promise.allSettled(
					files.map(async (file) => {
						const uploadURL = await getPresignedUrl(file.name);
						await uploadFileToS3({ file, uploadURL });
						return uploadURL.split('?')[0];
					}),
				);

				results.forEach((result, index) => {
					if (result.status === 'fulfilled') {
						uploadedImageUrls.push(result.value);
					} else {
						error(`Failed to upload file: ${files[index].name}`)
						console.error(`Failed to upload file: ${files[index].name}`, result.reason);
					}
				});
			}

			const inventoryItem = {
				...rest,
				images: [...(images ? images : []), ...uploadedImageUrls],
			};

			return inventoryApi.updateInventoryItem(inventoryItem);
		},
		onSuccess: (_, variables) => {
			void queryClient.invalidateQueries({ queryKey: inventoryKeys.allCategories });
			void queryClient.invalidateQueries({ queryKey: inventoryKeys.allInventory });

			if (variables.category) {
				void queryClient.invalidateQueries({ queryKey: inventoryKeys.currentCategory(variables.category) });
			}

			if (variables.oldCategory) {
				void queryClient.invalidateQueries({ queryKey: inventoryKeys.currentCategory(variables.oldCategory) });
			}

			success('Item updated successfully!');
			logger(LogLevel.INFO, LogSource.WEBAPP, 'Item updated successfully', {
				camp_id: decodedIDToken?.camp_id,
				user: decodedIDToken?.email,
				imageCount: variables.images?.length,
			});
		},
		onError: (error) => errorHandler(error),
	});

	return { mutate, mutateAsync, isPending, isSuccess, isError };
};

export { useUpdateInventoryItem };