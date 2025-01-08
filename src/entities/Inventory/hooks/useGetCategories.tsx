import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { errorHandler } from '@shared/lib/errorHandler';
import { inventoryApi } from '../api/inventoryApi';
import { inventoryKeys } from '../model/const/inventoryKeys';

const useGetCategories = () => {
	const { data, isLoading, isSuccess, isError, error } = useQuery({
		queryKey: inventoryKeys.allCategories,
		queryFn: inventoryApi.getCategories,
		staleTime: 5 * 60 * 1000,
	});

	useEffect(() => {
		if (isError) {
			errorHandler(error);
		}
	}, [isError, error]);

	return { data, isLoading, isSuccess, isError };
};

export { useGetCategories };