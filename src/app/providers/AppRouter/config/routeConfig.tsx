import { type RouteProps } from 'react-router-dom';
import FunnelPage from 'pages/FunnelPage';
import FinancesPage from 'pages/FinancesPage';
import InventoryPage from 'pages/InventoryPage';
import ShiftsPage from 'pages/ShiftsPage';
import NotFoundPage from 'pages/NotFoundPage';
import ProfilePage from 'pages/ProfilePage';
import DashboardPage from 'pages/DashboardPage';
import SignInPage from 'pages/SignInPage';
import SignUpOwnerPage from 'pages/SignUpTCOPage';
import ResetPassPage from 'pages/ResetPassPage';

export type AppRouterProps = {
  authOnly?: boolean;
} & RouteProps;

export enum AppRoutes {
  DASHBOARD = 'dashboard',
  FINANCES = 'finances',
  FUNNEL = 'funnel',
  INVENTORY = 'inventory',
  SHIFTS = 'shifts',
  PROFILE = 'profile',
  SIGN_UP = 'sign_up',
  SIGN_IN = 'sign_in',
  RESET_PASS = 'reset_pass',
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
  [AppRoutes.SIGN_IN]: '/login',
  [AppRoutes.RESET_PASS]: '/reset-password',
  [AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRoutes, AppRouterProps> = {
  [AppRoutes.DASHBOARD]: {
    path: RoutePath.dashboard,
    element: <DashboardPage />,
    authOnly: true,
  },
  [AppRoutes.FUNNEL]: {
    path: RoutePath.funnel,
    element: <FunnelPage />,
    authOnly: true,
  },
  [AppRoutes.FINANCES]: {
    path: RoutePath.finances,
    element: <FinancesPage />,
    authOnly: true,
  },
  [AppRoutes.INVENTORY]: {
    path: RoutePath.inventory,
    element: <InventoryPage />,
    authOnly: true,
  },
  [AppRoutes.SHIFTS]: {
    path: RoutePath.shifts,
    element: <ShiftsPage />,
    authOnly: true,
  },
  [AppRoutes.PROFILE]: {
    path: RoutePath.profile,
    element: <ProfilePage />,
    authOnly: true,
  },
  [AppRoutes.SIGN_UP]: {
    path: RoutePath.sign_up,
    element: <SignUpOwnerPage />,
  },
  [AppRoutes.SIGN_IN]: {
    path: RoutePath.sign_in,
    element: <SignInPage />,
  },
  [AppRoutes.RESET_PASS]: {
    path: RoutePath.reset_pass,
    element: <ResetPassPage />,
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath.not_found,
    element: <NotFoundPage />,
  },
};
