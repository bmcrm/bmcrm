import { SocialNetworksData } from '@features/SocialIcon';
import { CamperSocial, FormikSocials } from '../model/types/Camper.types';

export const normalizeSocialLinks = (socials?: FormikSocials[]): CamperSocial[] | null => {
	if (!socials) return null;

	return socials
		?.filter(({ userName }) => userName.trim())
		.map(({ socialName, userName }) => {
			const domain = SocialNetworksData[socialName].domain || userName;
			const url = new URL(userName, domain).toString();

			return { url, name: socialName };
		});
}