import { RoutePath } from '@app/providers/AppRouter';
import type { NavLinkType } from '@shared/ui/CustomNavLink';
import CampIcon from '@shared/assets/icons/camp_monocolor.svg';

export const generateNavList = (campID: string): NavLinkType[] => ([
  {
    path: `${RoutePath.camp_overview}${campID}`,
    text: 'Camp',
    icon: <CampIcon />,
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
]);