import { memo, useMemo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import CustomNavLink from 'shared/ui/CustomNavLink/CustomNavLink';
import { CustomNavLinkTheme } from 'shared/ui/CustomNavLink/CustomNavLink.types';
import { settingNavItemsList } from './itemsData';
import styles from './SettingsNav.module.scss';

type SettingsNavProps = {
  className?: string;
};

const SettingsNav = memo(({ className }: SettingsNavProps) => {
  return (
    <nav className={classNames(styles.nav, {}, [className])}>
      <ul className={styles.nav__list}>
        {useMemo(() => settingNavItemsList.map(item =>
          <li key={item.path}><CustomNavLink link={item} theme={CustomNavLinkTheme.SETTINGS}/></li>), [])}
      </ul>
    </nav>
  );
});

export default SettingsNav;
