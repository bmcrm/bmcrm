import React, { memo, useMemo } from 'react';
import { useMediaQuery } from 'react-responsive';

import { classNames, Mods } from 'shared/lib/classNames/classNames';
import NavItem from '../../ui/NavItem/NavItem';
import { IUserAvatar, UserAvatar } from 'entities/User';

import { NavItemsList } from '../../model/NavItems';
import styles from './Nav.module.scss';
import { RoutePath } from 'app/providers/AppRouter';
import LogoutIcon from 'shared/assets/icons/logout_icon.svg';

type NavProps = {
  className?: string;
  user?: IUserAvatar | null;
  isOpen?: boolean;
  onClick?: () => void;
  onContentClick?: (e: React.MouseEvent) => void;
};

const Nav = memo((props: NavProps) => {
  const {
    className,
    user,
    isOpen,
    onClick,
    onContentClick,
  } = props;
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const mods: Mods = {
    [styles.open]: isOpen
  };
  
  return (
    <nav className={classNames(styles.nav, mods, [className])} onClick={onClick}>
      <div className={styles.nav__inner} onClick={onContentClick}>
        {isMobile && <UserAvatar theme={'mobile'} user={user}/>}
        <ul className={styles.nav__list}>
          {useMemo(() => NavItemsList.map(item => <NavItem key={item.path} item={item}/>), [])}
          {isMobile && <NavItem item={{
            path: RoutePath.sign_in,
            text: 'Log Out',
            disabled: false,
            icon: <LogoutIcon/>,
            logout: true,
          }}/>}
        </ul>
      </div>
    </nav>
  );
});

export default Nav;
