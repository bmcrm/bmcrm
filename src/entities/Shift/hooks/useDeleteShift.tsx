import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@shared/hooks/useToast';
import { errorHandler } from '@shared/lib/errorHandler';
import { shiftApi } from '../api/shiftApi';
import { shiftKeys } from '../model/const/shiftKeys';
import { shiftState } from '../model/state/shiftState';
import type { IShiftResponse } from '../model/types/Shift.types';

const useDeleteShift = () => {
	const queryClient = useQueryClient();
	const { success } = useToast();
	const { deletionCount, incrementDeletionCount, decrementDeletionCount } = shiftState();

	const { mutate, isPending, isSuccess, isError } = useMutation({
		mutationFn: shiftApi.deleteShift,
		onMutate: async (shiftID) => {
			incrementDeletionCount();

			await queryClient.cancelQueries({ queryKey: shiftKeys.allShifts });

			const previousShifts = queryClient.getQueryData<IShiftResponse>(shiftKeys.allShifts);

			queryClient.setQueryData<IShiftResponse>(shiftKeys.allShifts, (oldShifts) => {
				if (!oldShifts) return oldShifts;
				const shifts = oldShifts.items;

				const filteredShifts = shifts.filter((shift) => shift.shift_id !== shiftID);

				return { items: filteredShifts };
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