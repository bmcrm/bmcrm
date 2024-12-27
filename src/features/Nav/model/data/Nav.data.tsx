import { RoutePath } from '@app/providers/AppRouter';
import { userState } from '@entities/User';
import type { NavLinkType } from '@shared/ui/CustomNavLink';
import CampIcon from '@shared/assets/icons/camp_monocolor.svg';

const { decodedIDToken } = userState.getState().tokens;

export const navItemsList: NavLinkType[] = [
  {
    path: `${RoutePath.camp_overview}${decodedIDToken?.camp_id}`,
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
];
