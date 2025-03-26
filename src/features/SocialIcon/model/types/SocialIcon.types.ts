export enum SocialNetworks {
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

export const socialDomainPatterns = {
  [SocialNetworks.X]: /(?:https?:\/\/)?(?:www\.)?x\.com/i,
  [SocialNetworks.TWITTER]: /(?:https?:\/\/)?(?:www\.)?twitter\.com/i,
  [SocialNetworks.FACEBOOK]: /(?:https?:\/\/)?(?:www\.)?facebook\.com/i,
  [SocialNetworks.INSTAGRAM]: /(?:https?:\/\/)?(?:www\.)?instagram\.com/i,
  [SocialNetworks.TELEGRAM]: /(?:https?:\/\/)?(?:www\.)?t\.me/i,
  [SocialNetworks.WHATSAPP]: /(?:https?:\/\/)?(?:www\.)?wa\.me/i,
  [SocialNetworks.YOUTUBE]: /(?:https?:\/\/)?(?:www\.)?youtube\.com/i,
  [SocialNetworks.TIKTOK]: /(?:https?:\/\/)?(?:www\.)?tiktok\.com/i,
  [SocialNetworks.VIBER]: /(?:https?:\/\/)?(?:www\.)?viber\.com/i,
  [SocialNetworks.SNAPCHAT]: /(?:https?:\/\/)?(?:www\.)?snapchat\.com/i,
  [SocialNetworks.REDDIT]: /(?:https?:\/\/)?(?:www\.)?reddit\.com/i,
  [SocialNetworks.LINKEDIN]: /(?:https?:\/\/)?(?:www\.)?linkedin\.com/i,
  [SocialNetworks.DISCORD]: /(?:https?:\/\/)?(?:www\.)?discord\.com/i,
  [SocialNetworks.VK]: /(?:https?:\/\/)?(?:www\.)?vk\.com/i,
};