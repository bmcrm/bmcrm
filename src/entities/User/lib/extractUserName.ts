import { SocialNetworks, SocialNetworksData } from '@features/SocialIcon';

export const extractUserName = (url: string, name: SocialNetworks) => {
	const domain = SocialNetworksData[name]?.domain;
	if (!domain) return url;

	const normalizedUrl = url.replace(/^https?:\/\/(www\.)?/, '');
	const normalizedDomain = domain.replace(/^https?:\/\/(www\.)?/, '');

	const domainPattern = normalizedDomain.includes('@')
		? normalizedDomain.replace('@', '')
		: normalizedDomain;

	return normalizedUrl.replace(domainPattern, '').replace(/^\/+/, '');
};