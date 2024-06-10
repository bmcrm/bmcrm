import { memo, useMemo } from 'react';
import { useMediaQuery } from 'react-responsive';

import { classNames } from 'shared/lib/classNames/classNames';
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
};

const Nav = memo(({ className, user, isOpen }: NavProps) => {
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  
  return (
    <nav className={classNames(styles.nav, { [styles.open]: isOpen }, [className])}>
      <div className={styles.nav__inner}>
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
