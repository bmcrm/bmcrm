import { SocialNetworks, SocialNetworksData } from '@features/SocialIcon';

export const extractUserName = (url: string, name: SocialNetworks) => {
	const domain = SocialNetworksData[name]?.domain;
	if (!domain) return url;

	const normalizedUrl = url.replace(/^https?:\/\/(www\.)?/, '');

	return normalizedUrl.replace(domain.replace(/^https?:\/\/(www\.)?/, ''), '').replace(/^\/+/, '');
};