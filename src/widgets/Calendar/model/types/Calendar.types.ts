export enum CalendarEventType {
	BIRTHDAY = 'birthday',
  CUSTOM = 'custom',
}

export interface ICalendarDay {
	date: string;
	type: CalendarEventType;
	birthdays?: string[];
	customEvents?: { title: string; timestamp: string }[];
}