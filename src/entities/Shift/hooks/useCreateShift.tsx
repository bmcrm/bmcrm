import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@shared/hooks/useToast';
import { errorHandler } from '@shared/lib/errorHandler';
import { useUploadFilesAndReturnUrls } from '@shared/hooks/useUploadFilesAndReturnUrls';
import { SHIFT_ENDPOINT } from '@shared/const/endpoints.ts';
import { shiftApi } from '../api/shiftApi';
import { shiftKeys } from '../model/const/shiftKeys';
import type { IShift } from '../model/types/Shift.types';

const useCreateShift = () => {
	const queryClient = useQueryClient();
	const { uploadFiles } = useUploadFilesAndReturnUrls();
	const { success } = useToast();

	const { mutate, mutateAsync, isPending, isSuccess, isError } = useMutation({
		mutationFn: async (shift: Partial<IShift> & { newFiles: File[] }) => {
			const { newFiles, ...rest } = shift;

			const uploadedImageUrls = await uploadFiles({ files: newFiles, endpoint: `${SHIFT_ENDPOINT}/generate-upload-url` });

			const newShift = {
				...rest,
				files: uploadedImageUrls,
			};

			return shiftApi.createShift(newShift);
		},
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: shiftKeys.allShifts });

			success('Shift created successfully!');
		},
		onError: (error) => errorHandler(error),
	});

	return { mutate, mutateAsync, isPending, isSuccess, isError };
};

export { useCreateShift };