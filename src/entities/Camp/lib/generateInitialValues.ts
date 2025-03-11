import { parseISO } from 'date-fns';
import { ICalendarEvent } from '../model/types/Camp.types';

export const generateCalendarInitials = (event?: ICalendarEvent | null) => ({
	event: event?.event || '',
	date: event?.date ? parseISO(event.date) : null,
});