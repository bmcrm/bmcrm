import { type CamperSocial } from '@entities/Camper';
import { SocialIconsEnum } from '@features/SocialIconItem';

export const socialLinksParser = (urls: string | string[]): CamperSocial[] => {
  const socialNetworks = Object.values(SocialIconsEnum);
  const urlsArray = Array.isArray(urls) ? urls : [urls];

  return urlsArray.map(url => {
    const foundSocial = socialNetworks.find(social => url.toLowerCase().includes(social));

    return {
      name: foundSocial ? foundSocial : 'default',
      url: url,
    };
  });
};