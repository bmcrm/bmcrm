import { extractUserName } from '../lib/extractUserName';
import type { ICamper, FormikSocials } from '@entities/Camper';
import { SocialNetworks } from '@features/SocialIcon';

export const userSettingsFormInitial = (camper: ICamper): Partial<ICamper> & { socials: FormikSocials[] } | null => {

	if (!camper) return null;

	const { first_name, last_name, playa_name, city, about_me, history, social_links, visitedBM, birthdayDate } = camper;
	const currentYear = new Date().getFullYear();
	const filteredSocials = social_links?.filter(sl => sl.name && sl.url);

	const socials: FormikSocials[] = filteredSocials && filteredSocials.length > 0
		? filteredSocials.map(({ name, url }) => ({
			socialName: name,
			userName: extractUserName(url, name),
		}))
		: [{ socialName: SocialNetworks.DEFAULT, userName: '' }];

	return ({
		first_name: first_name || '',
		last_name: last_name || '',
		playa_name: playa_name || '',
		city: city || '',
		about_me: about_me || '',
		visitedBM: visitedBM || [],
		birthdayDate: birthdayDate || null,
		history: history || [{ year: String(currentYear), value: '' }],
		socials,
	});
};