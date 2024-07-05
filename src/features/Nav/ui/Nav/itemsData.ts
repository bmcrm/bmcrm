import { RoutePath } from 'app/providers/AppRouter';
import { NavLinkType } from 'shared/ui/CustomNavLink/CustomNavLink.types';

export const navItemsList: NavLinkType[] = [
  // {
  //   path: RoutePath.dashboard,
  //   text: 'Dashboard',
  //   disabled: true,
  // },

  {
    path: RoutePath.funnel,
    text: 'Funnel',
  },
  {
    path: RoutePath.finances,
    text: 'Finances',
    disabled: true,
  },
  {
    path: RoutePath.shifts,
    text: 'Shifts',
    disabled: true,
  },
  {
    path: RoutePath.inventory,
    text: 'Inventory',
    disabled: true,
  },
];
