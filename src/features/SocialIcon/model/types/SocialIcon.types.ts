export enum SocialIcons {
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
  [SocialIcons.X]: /(?:https?:\/\/)?(?:www\.)?x\.com/i,
  [SocialIcons.TWITTER]: /(?:https?:\/\/)?(?:www\.)?twitter\.com/i,
  [SocialIcons.FACEBOOK]: /(?:https?:\/\/)?(?:www\.)?facebook\.com/i,
  [SocialIcons.INSTAGRAM]: /(?:https?:\/\/)?(?:www\.)?instagram\.com/i,
  [SocialIcons.TELEGRAM]: /(?:https?:\/\/)?(?:www\.)?t\.me/i,
  [SocialIcons.WHATSAPP]: /(?:https?:\/\/)?(?:www\.)?wa\.me/i,
  [SocialIcons.YOUTUBE]: /(?:https?:\/\/)?(?:www\.)?youtube\.com/i,
  [SocialIcons.TIKTOK]: /(?:https?:\/\/)?(?:www\.)?tiktok\.com/i,
  [SocialIcons.VIBER]: /(?:https?:\/\/)?(?:www\.)?viber\.com/i,
  [SocialIcons.SNAPCHAT]: /(?:https?:\/\/)?(?:www\.)?snapchat\.com/i,
  [SocialIcons.REDDIT]: /(?:https?:\/\/)?(?:www\.)?reddit\.com/i,
  [SocialIcons.LINKEDIN]: /(?:https?:\/\/)?(?:www\.)?linkedin\.com/i,
  [SocialIcons.DISCORD]: /(?:https?:\/\/)?(?:www\.)?discord\.com/i,
  [SocialIcons.VK]: /(?:https?:\/\/)?(?:www\.)?vk\.com/i,
};