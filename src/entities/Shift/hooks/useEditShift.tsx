import { useMutation, useQueryClient } from '@tanstack/react-query';
import { errorHandler } from '@shared/lib/errorHandler';
import { useUploadFilesAndReturnUrls } from '@shared/hooks/useUploadFilesAndReturnUrls';
import { SHIFT_ENDPOINT } from '@shared/const/endpoints';
import { shiftApi } from '../api/shiftApi';
import { shiftKeys } from '../model/const/shiftKeys';
import type { IShift } from '../model/types/Shift.types';

const useEditShift = () => {
	const queryClient = useQueryClient();
	const { uploadFiles } = useUploadFilesAndReturnUrls();

	const { mutate, mutateAsync, isPending, isSuccess, isError } = useMutation({
		mutationFn: async (editedShift: Partial<IShift> & { newFiles: File[] }) => {
			const { newFiles, files, ...rest } = editedShift;

			const uploadedImageUrls = await uploadFiles({ files: newFiles, endpoint: `${SHIFT_ENDPOINT}/generate-upload-url` });

			const shift = {
				...rest,
				files: [...(files ? files : []), ...uploadedImageUrls],
			};

			return shiftApi.editShift(shift);
		},
		onSuccess: () => queryClient.invalidateQueries({ queryKey: shiftKeys.allShifts }),
		onError: (error) => errorHandler(error),
	});

	return { mutate, mutateAsync, isPending, isSuccess, isError };
};

export { useEditShift };