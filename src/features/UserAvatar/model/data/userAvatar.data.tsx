import { RoutePath } from '@app/providers/AppRouter';
import DashboardIcon from '@shared/assets/icons/dashboard_icon.svg';
import SettingsIcon from '@shared/assets/icons/settings_icon.svg';

export const links = [
	{
		to: RoutePath.dashboard,
		text: 'Dashboard',
		icon: <DashboardIcon />,
	},
	{
		to: RoutePath.settings_account,
		text: 'Setting',
		icon: <SettingsIcon />,
	},
];