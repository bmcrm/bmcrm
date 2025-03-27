import { SocialNetworks } from '../types/SocialIcon.types';
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

export const SocialNetworksData = {
	[SocialNetworks.X]: {
		label: 'X',
		domain: 'https://x.com/',
		icon: <X />,
	},
	[SocialNetworks.TWITTER]: {
		label: 'Twitter',
		domain: 'https://twitter.com/',
		icon: <X />,
	},
	[SocialNetworks.FACEBOOK]: {
		label: 'Facebook',
		domain: 'https://facebook.com/',
		icon: <Facebook />,
	},
	[SocialNetworks.INSTAGRAM]: {
		label: 'Instagram',
		domain: 'https://instagram.com/',
		icon: <Instagram />,
	},
	[SocialNetworks.TELEGRAM]: {
		label: 'Telegram',
		domain: 'https://t.me/',
		icon: <Telegram />,
	},
	[SocialNetworks.WHATSAPP]: {
		label: 'WhatsApp',
		domain: 'https://wa.me/',
		icon: <Whatsapp />,
	},
	[SocialNetworks.YOUTUBE]: {
		label: 'YouTube',
		domain: 'https://youtube.com/@',
		icon: <Youtube />,
	},
	[SocialNetworks.TIKTOK]: {
		label: 'TikTok',
		domain: 'https://tiktok.com/@',
		icon: <Tiktok />,
	},
	[SocialNetworks.VIBER]: {
		label: 'Viber',
		domain: 'viber://chat?number=',
		icon: <Viber />,
	},
	[SocialNetworks.SNAPCHAT]: {
		label: 'Snapchat',
		domain: 'https://snapchat.com/add/',
		icon: <Snapchat />,
	},
	[SocialNetworks.REDDIT]: {
		label: 'Reddit',
		domain: 'https://reddit.com/user/',
		icon: <Reddit />,
	},
	[SocialNetworks.LINKEDIN]: {
		label: 'LinkedIn',
		domain: 'https://linkedin.com/in/',
		icon: <Linkedin />,
	},
	[SocialNetworks.DISCORD]: {
		label: 'Discord',
		domain: 'https://discord.com/users/',
		icon: <Discord />,
	},
	[SocialNetworks.VK]: {
		label: 'VK',
		domain: 'https://vk.com/',
		icon: <Vk />,
	},
	[SocialNetworks.DEFAULT]: {
		label: 'Other',
		domain: '',
		icon: <Default />,
	},
} as const;