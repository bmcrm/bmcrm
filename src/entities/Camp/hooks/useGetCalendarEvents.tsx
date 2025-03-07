import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { errorHandler } from '@shared/lib/errorHandler';
import { campKeys } from '../model/const/campKeys';
import { campApi } from '../api/campApi';

type UseGetCalendarEventsProps = {
	enabled?: boolean;
}

const useGetCalendarEvents = ({ enabled = true }: UseGetCalendarEventsProps = {}) => {
	const { data, isLoading, isSuccess, isError, error } = useQuery({
		queryKey: campKeys.calendarEvents,
		queryFn: campApi.getCalendarEvents,
		staleTime: 0,
		refetchOnMount: true,
		refetchOnWindowFocus: true,
		enabled,
	});

	useEffect(() => {
		if (isError) {
			errorHandler(error);
		}
	}, [isError, error]);

	return { data, isLoading, isSuccess, isError };
};

export { useGetCalendarEvents };