import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@shared/hooks/useToast';
import { errorHandler } from '@shared/lib/errorHandler';
import { shiftApi } from '../api/shiftApi';
import { shiftKeys } from '../model/const/shiftKeys';

const useCreateShift = () => {
	const queryClient = useQueryClient();
	const { success } = useToast();

	const { mutate, mutateAsync, isPending, isSuccess, isError } = useMutation({
		mutationFn: shiftApi.createShift,
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: shiftKeys.allShifts });

			success('Shift created successfully!');
		},
		onError: (error) => errorHandler(error),
	});

	return { mutate, mutateAsync, isPending, isSuccess, isError };
};

export { useCreateShift };