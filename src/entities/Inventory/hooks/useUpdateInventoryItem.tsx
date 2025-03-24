import { useMutation, useQueryClient } from '@tanstack/react-query';
import { errorHandler } from '@shared/lib/errorHandler';
import { useToast } from '@shared/hooks/useToast';
import { logger, LogLevel, LogSource } from '@shared/lib/logger';
import { useUploadFilesAndReturnUrls } from '@shared/hooks/useUploadFilesAndReturnUrls';
import { userState } from '@entities/User';
import { INVENTORY_ENDPOINT } from '@shared/const/endpoints';
import { inventoryApi } from '../api/inventoryApi';
import { inventoryKeys } from '../model/const/inventoryKeys';
import type { IInventoryItem } from '../model/types/Inventory.types';

const useUpdateInventoryItem = () => {
	const queryClient = useQueryClient();
	const { uploadFiles } = useUploadFilesAndReturnUrls();
	const { success } = useToast();
	const { tokens: { decodedIDToken } } = userState();

	const { mutate, mutateAsync, isPending, isSuccess, isError } = useMutation({
		mutationFn: async (item: Partial<IInventoryItem & { files: File[] }>) => {
			const { files, images, ...rest } = item;

			const uploadedImageUrls = await uploadFiles({ files, endpoint: `${INVENTORY_ENDPOINT}/upload` });

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