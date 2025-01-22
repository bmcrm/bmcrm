import { type CamperSocial } from '@entities/Camper';
import { SocialIcons } from '../model/types/SocialIcon.types';

export const socialLinksParser = (urls: string | string[]): CamperSocial[] => {
	const socialNetworks = Object.values(SocialIcons);
	const urlsArray = Array.isArray(urls) ? urls : [urls];

	return urlsArray.map(url => {
		const foundSocial = socialNetworks.find(social => url.toLowerCase().includes(social));

		return {
			name: foundSocial ? foundSocial : 'default',
			url: url,
		};
	});
};