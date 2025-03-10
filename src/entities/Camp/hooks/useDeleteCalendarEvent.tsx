import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@shared/hooks/useToast';
import { errorHandler } from '@shared/lib/errorHandler';
import { campApi } from '../api/campApi';
import { campKeys } from '../model/const/campKeys';
import type { ICalendarEvent } from '../model/types/Camp.types';

const useDeleteCalendarEvent = () => {
	const queryClient = useQueryClient();
	const { success } = useToast();

	const { mutate, isPending, isSuccess, isError } = useMutation({
		mutationFn: campApi.deleteCalendarEvent,
		onMutate: async (timestamp) => {

			await queryClient.cancelQueries({ queryKey: campKeys.calendarEvents });

			const previousEvents = queryClient.getQueryData<ICalendarEvent[]>(campKeys.calendarEvents);

			queryClient.setQueryData<ICalendarEvent[]>(campKeys.calendarEvents, (oldEvents) => {
				if (!oldEvents) return oldEvents;

				return oldEvents.filter((event) => event.timestamp !== timestamp);
			});

			success('Event successfully removed');

			return { previousEvents };
		},
		onError: (error, _, context) => {
			if (context?.previousEvents) {
				queryClient.setQueryData(campKeys.calendarEvents, context.previousEvents);
			}

			errorHandler(error);
		},
		onSettled: () => {
			void queryClient.invalidateQueries({ queryKey: campKeys.calendarEvents });
		},
	});

	return { mutate, isPending, isSuccess, isError };
};

export { useDeleteCalendarEvent };