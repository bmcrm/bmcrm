import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { errorHandler } from '@shared/lib/errorHandler';
import { shiftApi } from '../api/shiftApi';
import { shiftKeys } from '../model/const/shiftKeys';

const useGetShifts = () => {
	const { data, isLoading, isSuccess, isError, error } = useQuery({
		queryKey: shiftKeys.allShifts,
		queryFn: shiftApi.getShifts,
		staleTime: 5 * 60 * 1000,
		select: (data) => data.items,
	});

	useEffect(() => {
		if (isError) {
			errorHandler(error);
		}
	}, [isError, error]);

	return { data, isLoading, isSuccess, isError };
};

export { useGetShifts };