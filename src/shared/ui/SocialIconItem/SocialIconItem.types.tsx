import { ReactNode } from 'react';
import X from 'icons/x_icon.svg';
import Facebook from 'icons/fb_icon.svg';
import Instagram from 'icons/inst_icon.svg';

export enum SocialIconsEnum {
  X = 'x',
  FACEBOOK = 'facebook',
  INSTAGRAM = 'instagram',
}

export const SocialIcons: Record<SocialIconsEnum, ReactNode> = {
  [SocialIconsEnum.X]: <X />,
  [SocialIconsEnum.FACEBOOK]: <Facebook />,
  [SocialIconsEnum.INSTAGRAM]: <Instagram />,
};