import { RoutePath } from 'app/providers/AppRouter';

export type NavItemType = {
	path: string;
	text: string;
};

export const NavItemsList: NavItemType[] = [
	{
		path: RoutePath.funnel,
		text: 'Funnel',
	},
	{
		path: RoutePath.finances,
		text: 'Finances',
	},
	{
		path: RoutePath.shifts,
		text: 'Shifts',
	},
	{
		path: RoutePath.inventory,
		text: 'Inventory',
	},
];