import { parseISO } from 'date-fns';
import { ICalendarEvent } from '../model/types/Camp.types';

export const generateCalendarInitials = (event?: ICalendarEvent | null) => ({
	event: event?.event || '',
	startDate: event?.startDate ? parseISO(event.startDate) : null,
	endDate: event?.endDate ? parseISO(event.endDate) : null,
});