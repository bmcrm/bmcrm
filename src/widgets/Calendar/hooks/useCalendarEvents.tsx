import { useMemo } from 'react';
import { eachDayOfInterval, format, parseISO } from 'date-fns';
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
				const start = parseISO(event.startDate);
				const end = event.endDate ? parseISO(event.endDate) : start;

				const eventDates = eachDayOfInterval({ start, end });

				eventDates.forEach((date) => {
					const formattedDate = format(date, 'yyyy-MM-dd');

					const existingEvent = events.find(
						(e) => e.date === formattedDate && e.type === CalendarEventType.CUSTOM
					);

					const eventData = {
						event: event.event,
						timestamp: event.timestamp,
						date: formattedDate,
						camp_id: event.camp_id,
						originalEvent: event,
					};

					if (existingEvent) {
						existingEvent.customEvents?.push(eventData);
					} else {
						events.push({
							date: formattedDate,
							type: CalendarEventType.CUSTOM,
							customEvents: [eventData],
						});
					}
				});
			});
		}

		return events;
	}, [birthdays, calendarEvents]);
};

export { useCalendarEvents };