import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
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
		retry: 1,
		enabled,
	});

	useEffect(() => {
		if (isError) {
			if (error instanceof AxiosError && error.response?.data?.message === `Camp with id ${campID} not found`) {
				return;
			}

			errorHandler(error);
		}
	}, [isError, error]);

	return { data, isLoading, isSuccess, isError };
};

export { useGetCamp };