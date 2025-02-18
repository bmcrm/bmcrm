import type { ICamper } from '@entities/Camper';

export const userSettingsFormInitial = (camper: ICamper): Partial<ICamper> => {
	const { first_name, last_name, playa_name, city, about_me, history, social_links, visitedBM } = camper;
	const currentYear = new Date().getFullYear();

	return ({
		first_name: first_name || '',
		last_name: last_name || '',
		playa_name: playa_name || '',
		city: city || '',
		about_me: about_me || '',
		visitedBM: visitedBM || [],
		history: history || [{ year: String(currentYear), value: '' }],
		...(social_links && social_links.length > 0 ? { social_links } : { social_links: [{ name: '', url: '' }] }),
	});
};