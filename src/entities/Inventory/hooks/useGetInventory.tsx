import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { errorHandler } from '@shared/lib/errorHandler';
import { inventoryKeys } from '../model/const/inventoryKeys';
import { inventoryApi } from '../api/inventoryApi';

type UseGetInventoryProps = {
	itemID?: string;
	enabled?: boolean;
}

const useGetInventory = ({ itemID, enabled = true }: UseGetInventoryProps = {}) => {
	const { data, isLoading, isSuccess, isError, error } = useQuery({
		queryKey: inventoryKeys.allInventory,
		queryFn: () => inventoryApi.getInventory(itemID ?? ''),
		staleTime: 5 * 60 * 1000,
		enabled,
	});

	useEffect(() => {
		if (isError) {
			errorHandler(error);
		}
	}, [isError, error]);

	return { data, isLoading, isSuccess, isError };
};

export { useGetInventory };