import { RoutePath } from '@app/providers/AppRouter';
import SettingsIcon from '@shared/assets/icons/settings_icon.svg';

export const links = [
	{
		to: RoutePath.settings_account,
		text: 'Setting',
		icon: <SettingsIcon />,
	},
];