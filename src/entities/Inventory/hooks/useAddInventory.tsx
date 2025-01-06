import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@shared/hooks/useToast';
import { errorHandler } from '@shared/lib/errorHandler';
import { logger, LogLevel, LogSource } from '@shared/lib/logger';
import { useGetPresignedUrl } from './useGetPresignedUrl';
import { useUploadFileToS3 } from './useUploadFileToS3';
import { userState } from '@entities/User';
import { inventoryKeys } from '../model/const/inventoryKeys';
import { inventoryApi } from '../api/inventoryApi';
import type { IInventoryItem } from '../model/types/Inventory.types';

const useAddInventory = () => {
	const queryClient = useQueryClient();
	const { success } = useToast();
	const { tokens: { decodedIDToken } } = userState();
	const { mutateAsync: getPresignedUrl } = useGetPresignedUrl();
	const { mutateAsync: uploadFileToS3 } = useUploadFileToS3();

	const { mutate, mutateAsync, isPending, isSuccess, isError } = useMutation({
		mutationFn: async (item: Partial<IInventoryItem & { files: File[] }>) => {
			const { files, ...rest } = item;
			const uploadedImageUrls: string[] = [];

			if (files) {
				for (const file of files) {
					const uploadURL = await getPresignedUrl(file.name);
					await uploadFileToS3({ file, uploadURL });
					uploadedImageUrls.push(uploadURL.split('?')[0]);
				}
			}

			const inventoryItem = {
				...rest,
				images: uploadedImageUrls,
			};

			console.log('inventoryItem:', inventoryItem);

			return inventoryApi.addInventoryItem(inventoryItem);
		},
		onSuccess: (_, variables) => {
			void queryClient.invalidateQueries({ queryKey: inventoryKeys.allInventory });
			success('Item created successfully!');
			logger(LogLevel.INFO, LogSource.WEBAPP, 'Item created successfully', {
				camp_id: decodedIDToken?.camp_id,
				user: decodedIDToken?.email,
				imageCount: variables.images?.length,
			});
		},
		onError: (error) => errorHandler(error),
	});

	return { mutate, mutateAsync, isPending, isSuccess, isError };
};

export { useAddInventory };