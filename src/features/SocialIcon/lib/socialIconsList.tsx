import type { ReactNode } from 'react';
import { SocialIcons } from '../model/types/SocialIcon.types';
import X from '@shared/assets/icons/socials/x.svg';
import Facebook from '@shared/assets/icons/socials/facebook.svg';
import Instagram from '@shared/assets/icons/socials/instagram.svg';
import Telegram from '@shared/assets/icons/socials/telegram.svg';
import Whatsapp from '@shared/assets/icons/socials/whatsapp.svg';
import Youtube from '@shared/assets/icons/socials/youtube.svg';
import Tiktok from '@shared/assets/icons/socials/tiktok.svg';
import Viber from '@shared/assets/icons/socials/viber.svg';
import Snapchat from '@shared/assets/icons/socials/snapchat.svg';
import Reddit from '@shared/assets/icons/socials/reddit.svg';
import Linkedin from '@shared/assets/icons/socials/linkedin.svg';
import Discord from '@shared/assets/icons/socials/discord.svg';
import Vk from '@shared/assets/icons/socials/vk.svg';
import Default from '@shared/assets/icons/socials/default.svg';

export const socialIconsList: Record<SocialIcons, ReactNode> = {
	[SocialIcons.X]: <X />,
	[SocialIcons.TWITTER]: <X />,
	[SocialIcons.FACEBOOK]: <Facebook />,
	[SocialIcons.INSTAGRAM]: <Instagram />,
	[SocialIcons.TELEGRAM]: <Telegram />,
	[SocialIcons.WHATSAPP]: <Whatsapp />,
	[SocialIcons.YOUTUBE]: <Youtube />,
	[SocialIcons.TIKTOK]: <Tiktok />,
	[SocialIcons.VIBER]: <Viber />,
	[SocialIcons.SNAPCHAT]: <Snapchat />,
	[SocialIcons.REDDIT]: <Reddit />,
	[SocialIcons.LINKEDIN]: <Linkedin />,
	[SocialIcons.DISCORD]: <Discord />,
	[SocialIcons.VK]: <Vk />,
	[SocialIcons.DEFAULT]: <Default />,
};