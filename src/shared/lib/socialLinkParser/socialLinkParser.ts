import { type CamperSocial } from 'entities/Camper';
import { SocialIconsEnum } from 'shared/ui/SocialIconItem/SocialIconItem.types';

const socialLinksParser = (urls: string[]): CamperSocial[] => {
  const socialNetworks = Object.values(SocialIconsEnum);

  return urls.map(url => {
    const foundSocial = socialNetworks.find(social => url.toLowerCase().includes(social));

    return {
      name: foundSocial ? foundSocial : 'default',
      url: url,
    };
  });
};

export default socialLinksParser;