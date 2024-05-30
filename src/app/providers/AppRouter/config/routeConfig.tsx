import { type RouteProps } from 'react-router-dom';
import FunnelPage from 'pages/FunnelPage';
import FinancesPage from 'pages/FinancesPage';
import InventoryPage from 'pages/InventoryPage';
import ShiftsPage from 'pages/ShiftsPage';
import NotFoundPage from 'pages/NotFoundPage';

export enum AppRoutes {
	FINANCES = 'finances',
	FUNNEL = 'funnel',
	INVENTORY = 'inventory',
	SHIFTS = 'shifts',
	NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
	[AppRoutes.FUNNEL]: '/',
	[AppRoutes.FINANCES]: '/finances',
	[AppRoutes.INVENTORY]: '/inventory',
	[AppRoutes.SHIFTS]: '/shifts',
	[AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
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
	[AppRoutes.NOT_FOUND]: {
		path: RoutePath.not_found,
		element: <NotFoundPage />,
	},
};