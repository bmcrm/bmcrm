import { RoutePath } from '@app/providers/AppRouter';
import type { NavLinkType } from '@shared/ui/CustomNavLink';
import { CamperRole } from '@entities/Camper';

export const generateSettingNavItems = (role?: CamperRole): NavLinkType[] => [
  {
    path: RoutePath.settings_account,
    text: 'MY ACCOUNT',
  },
  ...(role === CamperRole.TCO || role === CamperRole.COORG
    ? [
      {
        path: RoutePath.settings_camp,
        text: 'CAMP',
      },
    ]
    : []),
];
