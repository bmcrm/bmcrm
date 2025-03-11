import { useMutation, useQueryClient } from '@tanstack/react-query';
import { errorHandler } from '@shared/lib/errorHandler';
import { campApi } from '../api/campApi';
import { campKeys } from '../model/const/campKeys';
import { ICalendarEvent } from '../model/types/Camp.types';

const useEditCalendarEvent = () => {
	const queryClient = useQueryClient();

	const { mutate, mutateAsync, isPending, isSuccess, isError } = useMutation({
		mutationFn: campApi.editCalendarEvent,
		onMutate: async (editedEvent) => {
			await queryClient.cancelQueries({ queryKey: campKeys.calendarEvents });

			const previousEvents = queryClient.getQueryData<ICalendarEvent[]>(campKeys.calendarEvents);

			queryClient.setQueryData<ICalendarEvent[]>(campKeys.calendarEvents, (oldEvents) => {
				if (!oldEvents) return oldEvents;

				return oldEvents.map((event) =>
					event.timestamp === editedEvent.timestamp
						? { ...event, ...editedEvent }
						: event
				);
			});

			return { previousEvents };
		},
		onError: (error, _, context) => {
			if (context?.previousEvents) {
				queryClient.setQueryData(campKeys.calendarEvents, context.previousEvents);
			}
			errorHandler(error);
		},
	});

	return { mutate, mutateAsync, isPending, isSuccess, isError };
};

export { useEditCalendarEvent };