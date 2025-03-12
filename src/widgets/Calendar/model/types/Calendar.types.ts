import type { ICalendarEvent } from '@entities/Camp';

export enum CalendarEventType {
	BIRTHDAY = 'birthday',
  CUSTOM = 'custom',
}

export interface ICalendarDay {
	date: string;
	type: CalendarEventType;
	birthdays?: string[];
	customEvents?: CustomCalendarEvent[];
}

export interface CustomCalendarEvent {
	event: string;
	timestamp: string;
	date: string;
	camp_id: string;
	originalEvent: ICalendarEvent;
}