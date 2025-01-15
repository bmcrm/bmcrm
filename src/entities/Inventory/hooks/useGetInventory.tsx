import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { errorHandler } from '@shared/lib/errorHandler';
import { inventoryKeys } from '../model/const/inventoryKeys';
import { inventoryApi } from '../api/inventoryApi';

type UseGetInventoryProps = {
	enabled?: boolean;
	queryParams?: { category?: string, limit?: string };
}

const useGetInventory = ({ queryParams, enabled = true }: UseGetInventoryProps = {}) => {
	const { data, isLoading, isSuccess, isError, error } = useQuery({
		queryKey: queryParams && queryParams.category
			? inventoryKeys.currentCategory(queryParams.category)
			: inventoryKeys.allInventory,
		queryFn: () => inventoryApi.getInventory(queryParams),
		staleTime: 5 * 60 * 1000,
		enabled: enabled && Boolean(queryParams),
	});

	useEffect(() => {
		if (isError) {
			errorHandler(error);
		}
	}, [isError, error]);

	return { data, isLoading, isSuccess, isError };
};

export { useGetInventory };