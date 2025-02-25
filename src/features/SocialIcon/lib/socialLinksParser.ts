import { type CamperSocial } from '@entities/Camper';
import { socialDomainPatterns, SocialIcons } from '../model/types/SocialIcon.types';

export const generateSocialName = (url: string): SocialIcons => {
	const lowerUrl = url.toLowerCase();

	for (const [social, pattern] of Object.entries(socialDomainPatterns)) {
		if (pattern.test(lowerUrl)) {
			return social as SocialIcons;
		}
	}

	return SocialIcons.DEFAULT;
};

export const socialLinksParser = (urls: string | string[]): CamperSocial[] => {
	const urlsArray = Array.isArray(urls) ? urls : [urls];

	return urlsArray.map(url => ({
		name: generateSocialName(url),
		url,
	}));
};