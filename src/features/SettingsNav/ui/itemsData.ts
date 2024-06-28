import { RoutePath } from 'app/providers/AppRouter';
import { NavLinkType } from 'shared/ui/CustomNavLink/CustomNavLink.types.ts';

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
