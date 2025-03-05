export const campKeys = {
	currentCamp: (campID: string) => ['camp', campID] as const,
	campEvents:  ['camp', 'events'] as const,
};