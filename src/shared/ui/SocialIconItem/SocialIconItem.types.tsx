import { ReactNode } from 'react';
import X from 'shared/assets/icons/socials/x.svg';
import Facebook from 'shared/assets/icons/socials/facebook.svg';
import Instagram from 'shared/assets/icons/socials/instagram.svg';
import Telegram from 'shared/assets/icons/socials/telegram.svg';
import Whatsapp from 'shared/assets/icons/socials/whatsapp.svg';
import Youtube from 'shared/assets/icons/socials/youtube.svg';
import Tiktok from 'shared/assets/icons/socials/tiktok.svg';
import Viber from 'shared/assets/icons/socials/viber.svg';
import Snapchat from 'shared/assets/icons/socials/snapchat.svg';
import Reddit from 'shared/assets/icons/socials/reddit.svg';
import Linkedin from 'shared/assets/icons/socials/linkedin.svg';
import Discord from 'shared/assets/icons/socials/discord.svg';
import Vk from 'shared/assets/icons/socials/vk.svg';
import Default from 'shared/assets/icons/socials/default.svg';

export enum SocialIconsEnum {
  X = 'x',
  TWITTER = 'twitter',
  FACEBOOK = 'facebook',
  INSTAGRAM = 'instagram',
  TELEGRAM = 't.me',
  WHATSAPP = 'wa.me',
  YOUTUBE = 'youtube',
  TIKTOK = 'tiktok',
  VIBER = 'viber',
  SNAPCHAT = 'snapchat',
  REDDIT = 'reddit',
  LINKEDIN = 'linkedin',
  DISCORD = 'discord',
  VK = 'vk',
  DEFAULT = 'default'
}

export const SocialIcons: Record<SocialIconsEnum, ReactNode> = {
  [SocialIconsEnum.X]: <X />,
  [SocialIconsEnum.TWITTER]: <X />,
  [SocialIconsEnum.FACEBOOK]: <Facebook />,
  [SocialIconsEnum.INSTAGRAM]: <Instagram />,
  [SocialIconsEnum.TELEGRAM]: <Telegram />,
  [SocialIconsEnum.WHATSAPP]: <Whatsapp />,
  [SocialIconsEnum.YOUTUBE]: <Youtube />,
  [SocialIconsEnum.TIKTOK]: <Tiktok />,
  [SocialIconsEnum.VIBER]: <Viber />,
  [SocialIconsEnum.SNAPCHAT]: <Snapchat />,
  [SocialIconsEnum.REDDIT]: <Reddit />,
  [SocialIconsEnum.LINKEDIN]: <Linkedin />,
  [SocialIconsEnum.DISCORD]: <Discord />,
  [SocialIconsEnum.VK]: <Vk />,
  [SocialIconsEnum.DEFAULT]: <Default />,
};