import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { errorHandler } from '@shared/lib/errorHandler';
import { campKeys } from '../model/const/campKeys';
import { campApi } from '../api/campApi';

type UseGetCampEventsProps = {
	enabled?: boolean;
}

const useGetCampEvents = ({ enabled = true }: UseGetCampEventsProps = {}) => {
	const { data, isLoading, isSuccess, isError, error } = useQuery({
		queryKey: campKeys.campEvents,
		queryFn: campApi.getCampEvents,
		staleTime: 0,
		refetchOnMount: 'always',
		refetchOnWindowFocus: 'always',
		enabled,
	});

	useEffect(() => {
		if (isError) {
			errorHandler(error);
		}
	}, [isError, error]);

	return { data, isLoading, isSuccess, isError };
};

export { useGetCampEvents };