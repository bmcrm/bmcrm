import { type CamperSocial } from '@entities/Camper';
import { socialDomainPatterns, SocialNetworks } from '../model/types/SocialIcon.types';

export const generateSocialName = (url: string): SocialNetworks => {
	const lowerUrl = url.toLowerCase();

	for (const [social, pattern] of Object.entries(socialDomainPatterns)) {
		if (pattern.test(lowerUrl)) {
			return social as SocialNetworks;
		}
	}

	return SocialNetworks.DEFAULT;
};

export const socialLinksParser = (urls: string | string[]): CamperSocial[] => {
	const urlsArray = Array.isArray(urls) ? urls : [urls];

	return urlsArray.map(url => ({
		name: generateSocialName(url),
		url,
	}));
};