import { memo } from 'react';
import { classNames } from '@shared/lib/classNames';
import { CustomNavLink, CustomNavLinkTheme } from '@shared/ui/CustomNavLink';
import { generateSettingNavItems } from '../model/data/SettingsNav.data';
import { userState } from '@entities/User';
import styles from './SettingsNav.module.scss';

type SettingsNavProps = {
	className?: string;
};

const SettingsNav = memo(({ className }: SettingsNavProps) => {
	const { tokens: { decodedIDToken } } = userState();

	return (
		<nav className={classNames(styles.nav, {}, [className])}>
			<ul className={styles.nav__list}>
				{
					generateSettingNavItems(decodedIDToken?.role).map(item =>
						<li key={item.path}><CustomNavLink link={item} theme={CustomNavLinkTheme.SETTINGS}/></li>)
				}
			</ul>
		</nav>
	);
});

export default SettingsNav;
