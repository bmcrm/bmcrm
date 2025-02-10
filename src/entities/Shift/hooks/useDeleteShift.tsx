import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@shared/hooks/useToast';
import { errorHandler } from '@shared/lib/errorHandler';
import { shiftApi } from '../api/shiftApi';
import { shiftKeys } from '../model/const/shiftKeys';
import { shiftState } from '../model/state/shiftState';
import type { IShift } from '../model/types/Shift.types';

const useDeleteShift = () => {
	const queryClient = useQueryClient();
	const { success } = useToast();
	const { deletionCount, incrementDeletionCount, decrementDeletionCount } = shiftState();

	const { mutate, isPending, isSuccess, isError } = useMutation({
		mutationFn: shiftApi.deleteShift,
		onMutate: async (shiftID) => {
			incrementDeletionCount();

			await queryClient.cancelQueries({ queryKey: shiftKeys.allShifts });

			const previousShifts = queryClient.getQueryData<IShift[]>(shiftKeys.allShifts);

			queryClient.setQueryData<IShift[]>(shiftKeys.allShifts, (oldShifts) => {
				if (!oldShifts) return oldShifts;
				return oldShifts.filter((shift) => shift.shift_id !== shiftID);
			});

			success('Shift successfully removed');

			return { previousShifts };
		},
		onError: (error, _, context) => {
			if (context?.previousShifts) {
				queryClient.setQueryData(shiftKeys.allShifts, context.previousShifts);
			}
			errorHandler(error);
		},
		onSettled: () => {
			decrementDeletionCount();

			if (deletionCount === 1) {
				void queryClient.invalidateQueries({ queryKey: shiftKeys.allShifts });
			}
		},
	});

	return { mutate, isPending, isSuccess, isError };
};

export { useDeleteShift };