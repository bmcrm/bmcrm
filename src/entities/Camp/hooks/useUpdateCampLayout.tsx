import { useMutation, useQueryClient } from '@tanstack/react-query';
import { errorHandler } from '@shared/lib/errorHandler';
import { campKeys } from '../model/const/campKeys.ts';
import type { ICampLayout } from '../model/types/Camp.types.ts';
import { campLayoutApi } from '../api/campLayoutApi.ts';

const useUpdateCampLayout = () => {
  const queryClient = useQueryClient();

  const { mutate, mutateAsync, isPending, isSuccess, isError } = useMutation({
    mutationFn: (updatedCamp: Partial<ICampLayout>) => campLayoutApi.updateCampLayout(updatedCamp),

    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: campKeys.campLayout,
      });
    },

    onError: error => {
      errorHandler(error);
    },
  });

  return { mutate, mutateAsync, isPending, isSuccess, isError };
};

export { useUpdateCampLayout };
