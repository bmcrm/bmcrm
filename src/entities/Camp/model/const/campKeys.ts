export const campKeys = {
  currentCamp: (campID: string) => ['camp', campID] as const,
  campEvents: ['camp', 'events'] as const,
  calendarEvents: ['calendar', 'events'] as const,
  campLayout: ['camp_layout'] as const,
};
