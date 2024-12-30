import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { errorHandler } from '@shared/lib/errorHandler';
import { camperKeys } from '../model/const/camperKeys';
import { camperApi } from '../api/camperApi';

type UseGetCampersProps = {
  camperEmail?: string;
	enabled?: boolean;
}

const useGetCampers = ({ camperEmail, enabled = true }: UseGetCampersProps = {}) => {
	const { data, isLoading, isSuccess, isError, error } = useQuery({
		queryKey: camperKeys.allCampers,
		queryFn: () => camperApi.getCampers(),
		select: (data) => {
			if (!camperEmail) return data;

			const camper = data.find((camper) => camper.email === camperEmail);

			return camper ? [camper] : [];
		},
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

export { useGetCampers };