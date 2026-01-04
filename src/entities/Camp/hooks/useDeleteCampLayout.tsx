import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@shared/hooks/useToast';
import { errorHandler } from '@shared/lib/errorHandler';
import { campKeys } from '../model/const/campKeys';
import { campLayoutApi } from '../api/campLayoutApi';

const useDeleteCampLayout = () => {
  const queryClient = useQueryClient();
  const { success } = useToast();

  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: () => campLayoutApi.deleteCampLayout(),

    onSuccess: () => {
      success('Layout successfully removed');

      void queryClient.invalidateQueries({ queryKey: campKeys.campLayout });
    },

    onError: error => {
      errorHandler(error);
    },
  });

  return { mutate, isPending, isSuccess, isError };
};

export { useDeleteCampLayout };
