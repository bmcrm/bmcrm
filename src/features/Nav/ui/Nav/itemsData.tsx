import { RoutePath } from 'app/providers/AppRouter';
import { NavLinkType } from 'shared/ui/CustomNavLink/CustomNavLink.types';
import CampIcon from 'shared/assets/icons/camp_monocolor.svg';

export const navItemsList: NavLinkType[] = [
  // {
  //   path: RoutePath.dashboard,
  //   text: 'Dashboard',
  //   disabled: true,
  // },
  {
    path: '',
    text: 'Camp',
    icon: <CampIcon/>,
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
  },
];
