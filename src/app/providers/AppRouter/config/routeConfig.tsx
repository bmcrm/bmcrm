import { type RouteProps } from 'react-router-dom';
import FunnelPage from 'pages/FunnelPage';
import FinancesPage from 'pages/FinancesPage';
import InventoryPage from 'pages/InventoryPage';
import ShiftsPage from 'pages/ShiftsPage';
import NotFoundPage from 'pages/NotFoundPage';
import ProfilePage from 'pages/ProfilePage';
import DashboardPage from 'pages/DashboardPage';
import SignInPage from 'pages/SignInPage';
import SignUpOwnerPage from 'pages/SignUpOwnerPage';

export enum AppRoutes {
  DASHBOARD = 'dashboard',
  FINANCES = 'finances',
  FUNNEL = 'funnel',
  INVENTORY = 'inventory',
  SHIFTS = 'shifts',
  PROFILE = 'profile',
  SIGN_UP = 'sign_up',
  SIGN_IN = 'sign_in',
  NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.DASHBOARD]: '/',
  [AppRoutes.FUNNEL]: '/funnel',
  [AppRoutes.FINANCES]: '/finances',
  [AppRoutes.INVENTORY]: '/inventory',
  [AppRoutes.SHIFTS]: '/shifts',
  [AppRoutes.PROFILE]: '/profile',
  [AppRoutes.SIGN_UP]: '/signup',
  [AppRoutes.SIGN_IN]: '/signin',
  [AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.DASHBOARD]: {
    path: RoutePath.dashboard,
    element: <DashboardPage />,
  },
  [AppRoutes.FUNNEL]: {
    path: RoutePath.funnel,
    element: <FunnelPage />,
  },
  [AppRoutes.FINANCES]: {
    path: RoutePath.finances,
    element: <FinancesPage />,
  },
  [AppRoutes.INVENTORY]: {
    path: RoutePath.inventory,
    element: <InventoryPage />,
  },
  [AppRoutes.SHIFTS]: {
    path: RoutePath.shifts,
    element: <ShiftsPage />,
  },
  [AppRoutes.PROFILE]: {
    path: RoutePath.profile,
    element: <ProfilePage />,
  },
  [AppRoutes.SIGN_UP]: {
    path: RoutePath.sign_up,
    element: <SignUpOwnerPage />,
  },
  [AppRoutes.SIGN_IN]: {
    path: RoutePath.sign_in,
    element: <SignInPage />,
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath.not_found,
    element: <NotFoundPage />,
  },
};
