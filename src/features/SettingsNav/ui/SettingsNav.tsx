import { memo } from 'react';
import { classNames } from '@shared/lib/classNames';
import { CustomNavLink, CustomNavLinkTheme } from '@shared/ui/CustomNavLink';
import { settingNavItemsList } from '../model/data/SettingsNav.data';
import styles from './SettingsNav.module.scss';

type SettingsNavProps = {
	className?: string;
};

const SettingsNav = memo(({ className }: SettingsNavProps) => (
	<nav className={classNames(styles.nav, {}, [className])}>
		<ul className={styles.nav__list}>
			{
				settingNavItemsList.map(
					item => <li key={item.path}><CustomNavLink link={item} theme={CustomNavLinkTheme.SETTINGS}/></li>
				)
			}
		</ul>
	</nav>
));

export default SettingsNav;
