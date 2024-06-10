import { memo, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { classNames } from 'shared/lib/classNames/classNames';

import { Link } from 'react-router-dom';
import { Nav } from 'features/Nav';
import { useAuth, UserAvatar, IUserAvatar } from 'entities/User';

import { RoutePath } from 'app/providers/AppRouter';
import Logo from 'shared/assets/icons/logo.svg';
import styles from './Header.module.scss';

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

  useEffect(() => {
    if (isLoggedIn) {
      try {
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
      } catch (error) {
        console.log(error);
      }
    }
  }, [idToken, isLoggedIn]);

  return (
    <header className={classNames(styles.header, {}, [className])}>
      <div className={styles.header__container}>
        <strong className={styles.logo}>
          <Link to={RoutePath.funnel} className={styles.logo__link}>
            <Logo />
          </Link>
        </strong>
        <Nav />
        <UserAvatar user={user}/>
      </div>
    </header>
  );
});

export default Header;
