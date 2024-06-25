import { ReactNode } from 'react';
import X from 'icons/x_icon.svg';
import Facebook from 'icons/fb_icon.svg';
import Instagram from 'icons/inst_icon.svg';

export enum SocialIconsEnum {
  X = 'x',
  TWITTER = 'twitter',
  FACEBOOK = 'facebook',
  INSTAGRAM = 'instagram',
  TELEGRAM = 'telegram',
  WHATSAPP = 'whatsapp',
  LINE = 'line',
  DEFAULT = 'default'
}

export const SocialIcons: Record<SocialIconsEnum, ReactNode> = {
  [SocialIconsEnum.X]: <X />,
  [SocialIconsEnum.TWITTER]: <X />,
  [SocialIconsEnum.FACEBOOK]: <Facebook />,
  [SocialIconsEnum.INSTAGRAM]: <Instagram />,
  [SocialIconsEnum.TELEGRAM]: <Instagram />,
  [SocialIconsEnum.WHATSAPP]: <Instagram />,
  [SocialIconsEnum.LINE]: <Instagram />,
  [SocialIconsEnum.DEFAULT]: <Instagram />,
};