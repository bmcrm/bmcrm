import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@shared/hooks/useToast';
import { errorHandler } from '@shared/lib/errorHandler';
import { RoutePath } from '@app/providers/AppRouter';
import { inventoryApi } from '../api/inventoryApi';
import { inventoryKeys } from '../model/const/inventoryKeys';
import { inventoryState } from '../model/state/inventoryState';
import type { IInventoryItem } from '../model/types/Inventory.types';

interface MutationFnProps {
	itemID: string;
	category: string;
	lastItem?: boolean;
}

const useDeleteInventoryItem = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { success } = useToast();
	const { deletionCount, incrementDeletionCount, decrementDeletionCount } = inventoryState();

	const { mutate, isPending, isSuccess, isError } = useMutation({
		mutationFn: ({ itemID }: MutationFnProps) => inventoryApi.deleteInventoryItem(itemID),
		onMutate: async ({ itemID, lastItem, category }) => {
			incrementDeletionCount();

			await queryClient.cancelQueries({ queryKey: inventoryKeys.allInventory });
			await queryClient.cancelQueries({ queryKey: inventoryKeys.currentCategory(category) });
			await queryClient.cancelQueries({ queryKey: inventoryKeys.allCategories });

			const previousItems = queryClient.getQueryData<IInventoryItem[]>(inventoryKeys.allInventory);
			const previousCurrentItems = queryClient.getQueryData<IInventoryItem[]>(inventoryKeys.currentCategory(category));
			const previousCategories = queryClient.getQueryData<string[]>(inventoryKeys.allCategories);

			queryClient.setQueryData<IInventoryItem[]>(inventoryKeys.allInventory, (oldItems) => {
				if (!oldItems) return oldItems;
				return oldItems.filter((item) => item.id !== itemID);
			});

			queryClient.setQueryData<IInventoryItem[]>(inventoryKeys.currentCategory(category), (oldItems) => {
				if (!oldItems) return oldItems;
				return oldItems.filter((item) => item.id !== itemID);
			});

			if (lastItem && previousCategories) {
				queryClient.setQueryData<string[]>(inventoryKeys.allCategories, (oldCategories) => {
					if (!oldCategories) return oldCategories;
					return oldCategories.filter((cat) => cat !== category);
				});

				navigate(RoutePath.inventory);
			}

			success('Item successfully removed');

			return { previousItems, previousCurrentItems, previousCategories };
		},
		onError: (error, variables, context) => {
			if (context?.previousItems) {
				queryClient.setQueryData(inventoryKeys.allInventory, context.previousItems);
			}
			if (context?.previousCurrentItems) {
				queryClient.setQueryData(inventoryKeys.currentCategory(variables.category), context.previousCurrentItems);
			}
			if (context?.previousCategories) {
				queryClient.setQueryData(inventoryKeys.allCategories, context.previousCategories);
			}
			errorHandler(error);
		},
		onSettled: (_, __, variables) => {
			decrementDeletionCount();

			if (deletionCount === 1) {
				void queryClient.invalidateQueries({ queryKey: inventoryKeys.allInventory });
				void queryClient.invalidateQueries({ queryKey: inventoryKeys.allCategories });
				void queryClient.invalidateQueries({ queryKey: inventoryKeys.currentCategory(variables.category) });
			}
		},
	});

	return { mutate, isPending, isSuccess, isError };
};

export { useDeleteInventoryItem };