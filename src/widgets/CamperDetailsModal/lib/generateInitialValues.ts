import type { ICamper, IFormikCamper } from '@entities/Camper';

export const generateInitialValues = (camper: ICamper): Partial<IFormikCamper> => {
	const { first_name, last_name, playa_name, city, role, about_me, history, social_links, tags, visitedBM, birthdayDate } = camper;
	const currentYear = new Date().getFullYear();

	return ({
		role,
		first_name: first_name || '',
		last_name: last_name || '',
    playa_name: playa_name || '',
    city: city || '',
    about_me: about_me || '',
		history: history || [{ year: String(currentYear), value: '' }],
		visitedBM: visitedBM || [],
		birthdayDate: birthdayDate || null,
		tags: tags && Object.values(tags).length > 0
			? Object.entries(tags).map(([key, values]) => ({
				tagName: key,
				tagDetails: values,
			}))
			: [{ tagName: '', tagDetails: [] }],
		...(social_links && social_links.length > 0 ? { social_links } : { social_links: [{ name: '', url: '' }] }),
	});
};