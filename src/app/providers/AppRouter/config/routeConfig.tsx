import { type RouteProps } from 'react-router-dom';
import FunnelPage from 'pages/FunnelPage';
import FinancesPage from 'pages/FinancesPage';
import InventoryPage from 'pages/InventoryPage';
import ShiftsPage from 'pages/ShiftsPage';
import DashboardPage from 'pages/DashboardPage';
import SignInPage from 'pages/SignInPage';
import SignUpOwnerPage from 'pages/SignUpTCOPage';
import ResetPassPage from 'pages/ResetPassPage';
import CampOverviewPage from 'pages/CampOverviewPage';
import NotFound from 'widgets/CampNotFound';

export type AppRouterProps = {
  authOnly?: boolean;
} & RouteProps;

export enum AppRoutes {
  DASHBOARD = 'dashboard',
  FINANCES = 'finances',
  FUNNEL = 'funnel',
  INVENTORY = 'inventory',
  SHIFTS = 'shifts',
  SETTINGS = 'settings',
  SETTINGS_ACCOUNT = 'settings_account',
  SETTINGS_CAMP = 'settings_camp',
  SIGN_UP = 'sign_up',
  SIGN_IN = 'sign_in',
  RESET_PASS = 'reset_pass',
  CAMP_OVERVIEW = 'camp_overview',
  NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.DASHBOARD]: '/',
  [AppRoutes.FUNNEL]: '/funnel',
  [AppRoutes.FINANCES]: '/finances',
  [AppRoutes.INVENTORY]: '/inventory',
  [AppRoutes.SHIFTS]: '/shifts',
  [AppRoutes.SETTINGS]: '/settings',
  [AppRoutes.SETTINGS_ACCOUNT]: '/settings/account',
  [AppRoutes.SETTINGS_CAMP]: '/settings/camp',
  [AppRoutes.SIGN_UP]: '/signup',
  [AppRoutes.SIGN_IN]: '/login',
  [AppRoutes.RESET_PASS]: '/reset-password',
  [AppRoutes.CAMP_OVERVIEW]: '/id/',
  [AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: Partial<Record<AppRoutes, AppRouterProps>> = {
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
  [AppRoutes.CAMP_OVERVIEW]: {
    path: `${RoutePath.camp_overview}:id`,
    element: <CampOverviewPage />,
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath.not_found,
    element: (
      <NotFound textRedirect='GO BACK' redirectTo={RoutePath.funnel}>
        <h2>Ooops...</h2>
        <h1>This page is not found!</h1>
      </NotFound>
    ),
  },
};
