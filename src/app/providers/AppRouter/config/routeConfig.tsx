import { Suspense } from 'react';
import type { RouteProps } from 'react-router-dom';
import { PageLoader } from '@features/PageLoader';
import { FunnelPage } from '@pages/FunnelPage';
import { FinancesPage } from '@pages/FinancesPage';
import { InventoryPage } from '@pages/InventoryPage';
import { ShiftsPage } from '@pages/ShiftsPage';
import { DashboardPage } from '@pages/DashboardPage';
import { LoginPage } from '@pages/LoginPage';
import { RegisterTCOPage } from '@pages/RegisterTCOPage';
import { ResetPassPage } from '@pages/ResetPassPage';
import { CampOverviewPage } from '@pages/CampOverviewPage';
import { NotFound } from '@widgets/CampNotFound';
import { SettingsPage, SettingsAccount, SettingsCamp } from '@pages/SettingsPage';
import { CampersPage } from '@pages/CampersPage';
import { HomePage } from '@pages/HomePage';

export type AppRouterProps = {
  authOnly?: boolean;
  nested?: AppRouterProps[];
} & RouteProps;

export enum AppRoutes {
  HOME = 'home',
  DASHBOARD = 'dashboard',
  FINANCES = 'finances',
  FUNNEL = 'funnel',
  INVENTORY = 'inventory',
  SHIFTS = 'shifts',
  SETTINGS = 'settings',
  SETTINGS_ACCOUNT = 'settings_account',
  SETTINGS_CAMP = 'settings_camp',
  REGISTRATION = 'registration',
  LOGIN = 'login',
  RESET_PASS = 'reset_pass',
  CAMP_OVERVIEW = 'camp_overview',
  CAMPERS = 'campers',
  NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.HOME]: '/',
  [AppRoutes.DASHBOARD]: '/dashboard',
  [AppRoutes.FUNNEL]: '/funnel',
  [AppRoutes.FINANCES]: '/finances',
  [AppRoutes.INVENTORY]: '/inventory',
  [AppRoutes.SHIFTS]: '/shifts',
  [AppRoutes.SETTINGS]: '/settings',
  [AppRoutes.SETTINGS_ACCOUNT]: '/settings/account',
  [AppRoutes.SETTINGS_CAMP]: '/settings/camp',
  [AppRoutes.REGISTRATION]: '/registration',
  [AppRoutes.LOGIN]: '/login',
  [AppRoutes.RESET_PASS]: '/reset-password',
  [AppRoutes.CAMP_OVERVIEW]: '/id/',
  [AppRoutes.CAMPERS]: '/campers',
  [AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: Partial<Record<AppRoutes, AppRouterProps>> = {
  [AppRoutes.HOME]: {
    path: RoutePath.home,
    element: <HomePage />,
    authOnly: true,
  },
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
    path: `${RoutePath.inventory}/:category?`,
    element: <InventoryPage />,
    authOnly: true,
  },
  [AppRoutes.SHIFTS]: {
    path: RoutePath.shifts,
    element: <ShiftsPage />,
    authOnly: true,
  },
  [AppRoutes.REGISTRATION]: {
    path: RoutePath.registration,
    element: <RegisterTCOPage />,
  },
  [AppRoutes.LOGIN]: {
    path: RoutePath.login,
    element: <LoginPage />,
  },
  [AppRoutes.RESET_PASS]: {
    path: RoutePath.reset_pass,
    element: <ResetPassPage />,
  },
  [AppRoutes.CAMP_OVERVIEW]: {
    path: `${RoutePath.camp_overview}:id`,
    element: <CampOverviewPage />,
  },
  [AppRoutes.CAMPERS]: {
    path: RoutePath.campers,
    element: <CampersPage />,
    authOnly: true,
  },
  [AppRoutes.SETTINGS]: {
    path: RoutePath.settings,
    element: <SettingsPage />,
    authOnly: true,
    nested: [
      {
        path: RoutePath.settings_account,
        element: (
          <Suspense fallback={<PageLoader />}>
            <SettingsAccount />
          </Suspense>
        ),
      },
      {
        path: RoutePath.settings_camp,
        element: (
          <Suspense fallback={<PageLoader />}>
            <SettingsCamp />
          </Suspense>
        ),
      },
    ],
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath.not_found,
    element: (
      <NotFound textRedirect={'GO BACK'} redirectTo={RoutePath.funnel}>
        <h2>Ooops...</h2>
        <h1>This page is not found!</h1>
      </NotFound>
    ),
  },
};
