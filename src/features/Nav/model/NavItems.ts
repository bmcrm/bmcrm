import { ReactElement } from 'react';
import { RoutePath } from 'app/providers/AppRouter';

export type NavItemType = {
  path: string;
  text: string;
  icon?: ReactElement;
  logout?: boolean;
  disabled?: boolean;
};

export const NavItemsList: NavItemType[] = [
  {
    path: RoutePath.dashboard,
    text: 'Dashboard',
    disabled: true,
  },
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
