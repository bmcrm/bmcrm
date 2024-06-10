import { memo, useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { jwtDecode } from 'jwt-decode';
import { classNames } from 'shared/lib/classNames/classNames';

import { Link } from 'react-router-dom';
import { Nav } from 'features/Nav';
import Hamburger from 'features/Hamburger';
import { useAuth, UserAvatar, IUserAvatar } from 'entities/User';

import { RoutePath } from 'app/providers/AppRouter';
import Logo from 'shared/assets/icons/logo.svg';
import styles from './Header.module.scss';
import { useToggle } from 'shared/hooks/useToggle.tsx';

type HeaderProps = {
  className?: string;
};

interface IJwtPayload {
  'custom:first_name': string;
  'custom:last_name': string;
  'custom:playa_name': string;
}

const Header = memo(({ className }: HeaderProps) => {
  const { isLoggedIn, idToken } = useAuth();
  const [user, setUser] = useState<IUserAvatar | null>(null);
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const { isOpen, toggle } = useToggle();

  useEffect(() => {
    if (isLoggedIn) {
      const decodedToken = jwtDecode<IJwtPayload>(idToken);
      const userName = decodedToken['custom:playa_name']
        ? decodedToken['custom:playa_name']
        : `${decodedToken['custom:first_name']} ${decodedToken['custom:last_name']}`;
      const CapitalizedUserName = userName
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
      const decodedUser: IUserAvatar = {
        name: CapitalizedUserName,
        avatar: null,
      };

      setUser(decodedUser);
    }
  }, [idToken, isLoggedIn]);

  document.body.style.overflow = isOpen ? 'hidden' : 'auto';

  return (
    <header className={classNames(styles.header, {}, [className])}>
      <div className={styles.header__container}>
        <strong className={styles.logo}>
          <Link to={RoutePath.funnel} className={styles.logo__link}>
            <Logo />
          </Link>
        </strong>
        <Nav user={user} isOpen={isMobile ? isOpen : true}/>
        {!isMobile && <UserAvatar user={user}/>}
        {isMobile && <Hamburger isOpen={isOpen} onClick={toggle}/>}
      </div>
    </header>
  );
});

export default Header;
