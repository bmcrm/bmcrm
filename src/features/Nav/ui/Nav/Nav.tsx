import React, { memo, useMemo } from 'react';
import { useMediaQuery } from 'react-responsive';

import { classNames, type Mods } from 'shared/lib/classNames/classNames';
import CustomNavLink from 'shared/ui/CustomNavLink/CustomNavLink';
import { type IUserAvatar, useAuth, UserAvatar } from 'entities/User';

import { RoutePath } from 'app/providers/AppRouter';
import { navItemsList } from './itemsData';
import { CustomNavLinkTheme } from 'shared/ui/CustomNavLink/CustomNavLink.types';
import styles from './Nav.module.scss';
import CampIcon from 'shared/assets/icons/camp_monocolor.svg';
import SettingsIcon from 'shared/assets/icons/settings_icon.svg';
import LogoutIcon from 'shared/assets/icons/logout_icon.svg';

type NavProps = {
  className?: string;
  user?: IUserAvatar | null;
  isOpen?: boolean;
  onClick?: () => void;
  onContentClick?: (e: React.MouseEvent) => void;
};

const Nav = memo((props: NavProps) => {
  const { className, user, isOpen, onClick, onContentClick } = props;
  const { decodedIDToken } = useAuth();
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const mods: Mods = {
    [styles.open]: isOpen,
  };
  const campLink = {
    path: `${RoutePath.camp_overview}${decodedIDToken?.camp_id}`,
    text: 'My Camp',
    icon: <CampIcon />,
  };

  return (
    <nav className={classNames(styles.nav, mods, [className])} onClick={onClick}>
      <div className={styles.nav__inner} onClick={onContentClick}>
        {isMobile && <UserAvatar theme={'mobile'} user={user} />}
        <ul className={styles.nav__list}>
          <li className={styles.my_camp_link}>
            <CustomNavLink theme={CustomNavLinkTheme.CAMP} link={campLink} />
          </li>
          {useMemo(
            () =>
              navItemsList.map(item => (
                <li key={item.path}>
                  <CustomNavLink link={item} />
                </li>
              )),
            []
          )}
          {isMobile && (
            <>
              <li>
                <CustomNavLink
                  link={{
                    path: RoutePath.settings_account,
                    text: 'Setting',
                    icon: <SettingsIcon />,
                  }}
                  theme={CustomNavLinkTheme.ICON}
                />
              </li>
              <li>
                <CustomNavLink
                  link={{
                    path: RoutePath.sign_in,
                    text: 'Log Out',
                    icon: <LogoutIcon />,
                  }}
                  theme={CustomNavLinkTheme.LOGOUT}
                />
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
});

export default Nav;
