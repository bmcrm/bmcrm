import { useQuery } from '@tanstack/react-query';
import { campKeys } from '../model/const/campKeys';
import { campLayoutApi } from '../api/campLayoutApi';

const useGetCampLayout = () => {
  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: campKeys.campLayout,
    queryFn: () => campLayoutApi.getCampLayout(),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  return { data, isLoading, isSuccess, isError };
};

export { useGetCampLayout };
