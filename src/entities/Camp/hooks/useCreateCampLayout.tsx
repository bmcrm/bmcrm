import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@shared/hooks/useToast';
import { errorHandler } from '@shared/lib/errorHandler';
import { campKeys } from '../model/const/campKeys';
import { campLayoutApi } from '../api/campLayoutApi';

const useCreateCampLayout = () => {
  const queryClient = useQueryClient();
  const { success } = useToast();

  const { mutate, mutateAsync, isPending, isSuccess, isError } = useMutation({
    mutationFn: (data: { layout: string }) => campLayoutApi.createCampLayout({ layout: data.layout }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: campKeys.campLayout });
      success('Camp layout updated successfully!');
    },
    onError: error => errorHandler(error),
  });

  return { mutate, mutateAsync, isPending, isSuccess, isError };
};

export { useCreateCampLayout };
