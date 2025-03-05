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
	title: string;
	category: string;
	lastItem?: boolean;
}

const useDeleteInventoryItem = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { success } = useToast();
	const { deletionCount, incrementDeletionCount, decrementDeletionCount } = inventoryState();

	const { mutate, isPending, isSuccess, isError } = useMutation({
		mutationFn: ({ itemID, title }: MutationFnProps) => inventoryApi.deleteInventoryItem({ itemID, title }),
		onMutate: async ({ itemID, lastItem, category }) => {
			incrementDeletionCount();

			await queryClient.cancelQueries({ queryKey: inventoryKeys.allInventory });
			await queryClient.cancelQueries({ queryKey: inventoryKeys.currentCategory(category) });
			await queryClient.cancelQueries({ queryKey: inventoryKeys.allCategories });

			const previousItems = queryClient.getQueryData<IInventoryItem[]>(inventoryKeys.allInventory);
			const previousCurrentItems = queryClient.getQueryData<IInventoryItem[]>(inventoryKeys.currentCategory(category));
			const previousCategories = queryClient.getQueryData<string[]>(inventoryKeys.allCategories);

			queryClient.setQueryData<{ pages: { items: IInventoryItem[] }[], pageParams: string[] }>(
				inventoryKeys.allInventory,
				(oldData) => {
					if (!oldData) return oldData;

					return {
						...oldData,
						pages: oldData.pages.map((page) => ({
							...page,
							items: page.items.filter((item) => item.id !== itemID),
						})),
					};
				}
			);

			queryClient.setQueryData<{ pages: { items: IInventoryItem[] }[], pageParams: string[] }>(
				inventoryKeys.currentCategory(category),
				(oldData) => {
					if (!oldData) return oldData;

					return {
						...oldData,
						pages: oldData.pages.map((page) => ({
							...page,
							items: page.items.filter((item) => item.id !== itemID),
						})),
					};
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