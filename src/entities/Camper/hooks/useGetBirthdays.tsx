import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { errorHandler } from '@shared/lib/errorHandler';
import { camperKeys } from '../model/const/camperKeys';
import { camperApi } from '../api/camperApi';

type UseGetBirthdaysProps = {
	enabled?: boolean;
}

const useGetBirthdays = ({ enabled = true }: UseGetBirthdaysProps = {}) => {
	const { data, isLoading, isSuccess, isError, error } = useQuery({
		queryKey: camperKeys.campersBirthdays,
		queryFn: camperApi.getBirthdays,
		staleTime: 10 * 60 * 1000,
		enabled,
	});

	useEffect(() => {
		if (isError) {
			errorHandler(error);
		}
	}, [isError, error]);

	return { data, isLoading, isSuccess, isError };
};

export { useGetBirthdays };