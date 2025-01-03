import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { errorHandler } from '@shared/lib/errorHandler';
import { campKeys } from '../model/const/campKeys';
import { campApi } from '../api/campApi';

type UseGetCampProps = {
	campID: string;
	enabled?: boolean;
}

const useGetCamp = ({ campID, enabled = true }: UseGetCampProps) => {
	const { data, isLoading, isSuccess, isError, error } = useQuery({
		queryKey: campKeys.currentCamp(campID),
		queryFn: () => campApi.getCamp(campID ?? ''),
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

export { useGetCamp };