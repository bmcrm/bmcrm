import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@shared/hooks/useToast';
import { errorHandler } from '@shared/lib/errorHandler';
import { inventoryApi } from '../api/inventoryApi';
import { inventoryKeys } from '../model/const/inventoryKeys';
import type { IInventoryItem } from '../model/types/Inventory.types';

const useDeleteInventoryItem = () => {
	const queryClient = useQueryClient();
	const { success } = useToast();

	const { mutate, isPending, isSuccess, isError } = useMutation({
		mutationFn: ({ itemID, lastItem, category }: { itemID: string; lastItem?: boolean; category?: string }) => {
			return inventoryApi.deleteInventoryItem(itemID, { lastItem, category });
		},
		onMutate: async ({ itemID, lastItem, category }) => {
			await queryClient.cancelQueries({ queryKey: inventoryKeys.allInventory });
			await queryClient.cancelQueries({ queryKey: inventoryKeys.allCategories });

			const previousItems = queryClient.getQueryData<IInventoryItem[]>(inventoryKeys.allInventory);
			const previousCategories = queryClient.getQueryData<string[]>(inventoryKeys.allCategories);

			queryClient.setQueryData<IInventoryItem[]>(inventoryKeys.allInventory, (oldItems) => {
				if (!oldItems) return oldItems;
				success('Item successfully removed');

				return oldItems.filter((item) => item.id !== itemID);
			});

			if (lastItem && category && previousCategories) {
				queryClient.setQueryData<string[]>(inventoryKeys.allCategories, (oldCategories) => {
					if (!oldCategories) return oldCategories;
					return oldCategories.filter((cat) => cat !== category);
				});
			}

			return { previousItems, previousCategories };
		},
		onError: (error, _, context) => {
			if (context?.previousItems) {
				queryClient.setQueryData(inventoryKeys.allInventory, context.previousItems);
			}
			if (context?.previousCategories) {
				queryClient.setQueryData(inventoryKeys.allCategories, context.previousCategories);
			}
			errorHandler(error);
		},
		onSettled: () => {
			void queryClient.invalidateQueries({ queryKey: inventoryKeys.allInventory });
			void queryClient.invalidateQueries({ queryKey: inventoryKeys.allCategories });
		},
	});

	return { mutate, isPending, isSuccess, isError };
};

export { useDeleteInventoryItem };