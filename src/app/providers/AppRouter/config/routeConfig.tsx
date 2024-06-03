import { type RouteProps } from 'react-router-dom'
import FunnelPage from 'pages/FunnelPage'
import FinancesPage from 'pages/FinancesPage'
import InventoryPage from 'pages/InventoryPage'
import ShiftsPage from 'pages/ShiftsPage'
import NotFoundPage from 'pages/NotFoundPage'
import ProfilePage from 'pages/ProfilePage'
import DashboardPage from 'pages/DashboardPage'
import RegisterPage from 'pages/RegisterPage'

export enum AppRoutes {
  DASHBOARD = 'dashboard',
  FINANCES = 'finances',
  FUNNEL = 'funnel',
  INVENTORY = 'inventory',
  SHIFTS = 'shifts',
  PROFILE = 'profile',
  NOT_FOUND = 'not_found',
  REGISTER = 'register',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.DASHBOARD]: '/',
  [AppRoutes.FUNNEL]: '/funnel',
  [AppRoutes.FINANCES]: '/finances',
  [AppRoutes.INVENTORY]: '/inventory',
  [AppRoutes.SHIFTS]: '/shifts',
  [AppRoutes.PROFILE]: '/profile',
  [AppRoutes.REGISTER]: '/register',
  [AppRoutes.NOT_FOUND]: '*',
}

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
  [AppRoutes.REGISTER]: {
    path: RoutePath.register,
    element: <RegisterPage />,
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath.not_found,
    element: <NotFoundPage />,
  },
}
