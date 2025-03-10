import { useMemo } from 'react';
import { format, parseISO } from 'date-fns';
import type { CampersBirthdays } from '@entities/Camper';
import type { ICalendarEvent } from '@entities/Camp';
import { CalendarEventType, type ICalendarDay } from '../model/types/Calendar.types';

const useCalendarEvents = (
	birthdays?: CampersBirthdays,
	calendarEvents?: ICalendarEvent[]
) => {
	return useMemo(() => {
		const events: ICalendarDay[] = [];

		if (birthdays) {
			Object.entries(birthdays).forEach(([isoDate, names]) => {
				const birthDate = parseISO(isoDate);
				const formattedDate = format(birthDate, 'MM-dd');

				events.push({
					date: formattedDate,
					type: CalendarEventType.BIRTHDAY,
					birthdays: names,
				});
			});
		}

		if (calendarEvents) {
			calendarEvents.forEach((event) => {
				const formattedDate = format(parseISO(event.date), 'yyyy-MM-dd');

				const existingEvent = events.find(
					(e) => e.date === formattedDate && e.type === CalendarEventType.CUSTOM
				);

				if (existingEvent) {
					existingEvent.customEvents?.push({
						title: event.event,
						timestamp: event.timestamp,
					});
				} else {
					events.push({
						date: formattedDate,
						type: CalendarEventType.CUSTOM,
						customEvents: [{ title: event.event, timestamp: event.timestamp }],
					});
				}
			});
		}

		return events;
	}, [birthdays, calendarEvents]);
};

export { useCalendarEvents };