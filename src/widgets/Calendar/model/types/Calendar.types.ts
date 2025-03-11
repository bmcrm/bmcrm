import type { ICalendarEvent } from '@entities/Camp';

export enum CalendarEventType {
	BIRTHDAY = 'birthday',
  CUSTOM = 'custom',
}

export interface ICalendarDay {
	date: string;
	type: CalendarEventType;
	birthdays?: string[];
	customEvents?: ICalendarEvent[];
}