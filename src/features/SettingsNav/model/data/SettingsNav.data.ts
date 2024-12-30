import { RoutePath } from '@app/providers/AppRouter';
import type { NavLinkType } from '@shared/ui/CustomNavLink';

export const settingNavItemsList: NavLinkType[] = [
  {
    path: RoutePath.settings_account,
    text: 'MY ACCOUNT',
  },
  {
    path: RoutePath.settings_camp,
    text: 'CAMP',
  },
];
