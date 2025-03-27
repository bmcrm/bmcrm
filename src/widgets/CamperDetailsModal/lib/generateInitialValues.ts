import { extractUserName } from '@entities/User';
import type { ICamper, IFormikCamper } from '@entities/Camper';
import { SocialNetworks } from '@features/SocialIcon';

export const generateInitialValues = (camper: ICamper): Partial<IFormikCamper> => {
	const { first_name, last_name, playa_name, city, role, about_me, history, social_links, tags, visitedBM, birthdayDate } = camper;
	const currentYear = new Date().getFullYear();
	const filteredSocials = social_links?.filter(sl => sl.name && sl.url);

	const socials = filteredSocials && filteredSocials.length > 0
		? filteredSocials.map(({ name, url }) => ({
			socialName: name,
			userName: extractUserName(url, name),
		}))
		: [{ socialName: SocialNetworks.DEFAULT, userName: '' }];

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
		socials,
	});
};