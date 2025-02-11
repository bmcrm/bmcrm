import { useMutation, useQueryClient } from '@tanstack/react-query';
import { errorHandler } from '@shared/lib/errorHandler';
import { shiftApi } from '../api/shiftApi';
import { shiftKeys } from '../model/const/shiftKeys';
import type { IShiftResponse } from '../model/types/Shift.types';

const useEditShift = () => {
	const queryClient = useQueryClient();

	const { mutate, mutateAsync, isPending, isSuccess, isError } = useMutation({
		mutationFn: shiftApi.editShift,
		onMutate: async (editedShift) => {
			await queryClient.cancelQueries({ queryKey: shiftKeys.allShifts });

			const previousShift = queryClient.getQueryData<IShiftResponse>(shiftKeys.allShifts);

			queryClient.setQueryData<IShiftResponse>(shiftKeys.allShifts, (oldShift) => {
				if (!oldShift) return oldShift;

				const currentShifts = oldShift.items;

				const updatedShifts = currentShifts.map((shift) =>
					shift.shift_id === editedShift.shift_id
						? { ...shift, ...editedShift }
						: shift
				);

				return { items: updatedShifts };
			});

			return { previousShift };
		},
		onError: (error, _, context) => {
			if (context?.previousShift) {
				queryClient.setQueryData(shiftKeys.allShifts, context.previousShift);
			}
			errorHandler(error);
		},
	});

	return { mutate, mutateAsync, isPending, isSuccess, isError };
};

export { useEditShift };