import { useEffect, useMemo } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { errorHandler } from '@shared/lib/errorHandler';
import { inventoryKeys } from '../model/const/inventoryKeys';
import { inventoryApi } from '../api/inventoryApi';

type UseGetInventoryProps = {
	enabled?: boolean;
	queryParams?: { category?: string, limit?: string, title?: string } | null;
}

const useGetInventory = ({ queryParams, enabled = true }: UseGetInventoryProps = {}) => {
	const queryKey = useMemo(() => {
		if (queryParams?.title) {
			return inventoryKeys.searchByTitle(queryParams.title);
		}
		if (queryParams?.category) {
			return inventoryKeys.currentCategory(queryParams.category);
		}
		return inventoryKeys.allInventory;
	}, [queryParams?.title, queryParams?.category]);

	const { data, isLoading, isSuccess, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
		queryKey,
		queryFn: ({ pageParam }) =>
			inventoryApi.getInventory({ ...queryParams, ...(pageParam ? { nextToken: pageParam } : {}) }),
		getNextPageParam: (lastPage) => lastPage?.nextToken ?? undefined,
		initialPageParam: '',
		enabled: enabled && Boolean(queryParams),
		staleTime: queryParams?.title ? 0 : 5 * 60 * 1000,
		gcTime: queryParams?.title ? 0 : 5 * 60 * 1000,
		select: (data) => data.pages.flatMap((page) => page.items),
	})

	useEffect(() => {
		if (isError) {
			errorHandler(error);
		}
	}, [isError, error]);

	return { data, isLoading, isSuccess, isError, fetchNextPage, hasNextPage, isFetchingNextPage };
};

export { useGetInventory };