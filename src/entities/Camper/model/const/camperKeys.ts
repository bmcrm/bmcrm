export const camperKeys = {
	allCampers: ['campers', 'all'] as const,
	currentCamper: (camperEmail: string) => ['campers', 'current', camperEmail] as const,
};