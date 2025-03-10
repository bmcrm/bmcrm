import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@shared/hooks/useToast';
import { errorHandler } from '@shared/lib/errorHandler';
import { campApi } from '../api/campApi';
import { campKeys } from '../model/const/campKeys';

const useCreateCalendarEvent = () => {
	const queryClient = useQueryClient();
	const { success } = useToast();

	const { mutate, mutateAsync, isPending, isSuccess, isError } = useMutation({
		mutationFn: campApi.createCalendarEvent,
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: campKeys.calendarEvents });
			success('Event created successfully!');
		},
		onError: (error) => errorHandler(error),
	});

	return { mutate, mutateAsync, isPending, isSuccess, isError };
};

export { useCreateCalendarEvent };