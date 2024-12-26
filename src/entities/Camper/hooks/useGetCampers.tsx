import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { errorHandler } from '@shared/lib/errorHandler';
import { camperKeys } from '../model/const/camperKeys';
import { camperApi } from '../api/camperApi';

const useGetCampers = ({ camperEmail }: { camperEmail?: string | null } = {}) => {
	const { data, isLoading, isSuccess, isError, error } = useQuery({
		queryKey: camperEmail ? camperKeys.currentCamper(camperEmail) : camperKeys.allCampers,
		queryFn: () => camperApi.getCampers(camperEmail),
		staleTime: 5 * 60 * 1000,
	});

	useEffect(() => {
		if (isError) {
			errorHandler(error);
		}
	}, [isError, error]);

	return { data, isLoading, isSuccess, isError };
};

export { useGetCampers };