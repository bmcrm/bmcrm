import { memo, useCallback, useEffect, useState, type MouseEvent } from 'react';
import { useMedia } from '@shared/hooks/useMedia';
import { useToggle } from '@shared/hooks/useToggle';
import { classNames } from '@shared/lib/classNames';
import { Link } from 'react-router-dom';
import { Nav } from '@features/Nav';
import { Hamburger } from '@features/Hamburger';
import { userState, UserAvatar, type IUserAvatar } from '@entities/User';
import { RoutePath } from '@app/providers/AppRouter';
import styles from './Header.module.scss';
import Logo from '@shared/assets/icons/logo.svg';

type HeaderProps = {
  className?: string;
};

const Header = memo(({ className }: HeaderProps) => {
  const { tokens: { decodedIDToken }  } = userState();
  const [user, setUser] = useState<IUserAvatar | null>(null);
  const { isMobile } = useMedia();
  const { isOpen, toggle, close } = useToggle();

  useEffect(() => {
    if (decodedIDToken) {
      const firstLastName = decodedIDToken.first_name && decodedIDToken.last_name
        ? `${decodedIDToken.first_name} ${decodedIDToken.last_name}` : undefined;
      const name = decodedIDToken.playa_name || firstLastName || decodedIDToken.email;

      const capitalizedName = name.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');

      const decodedUser: IUserAvatar = {
        name: capitalizedName,
        avatar: null,
      };

      setUser(decodedUser);
    }
  }, [decodedIDToken]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const onContentClick = useCallback((e: MouseEvent) => {
    e.stopPropagation();
  }, []);

  return (
    <header className={classNames(styles.header, {}, [className])}>
      <div className={styles.header__container}>
        <strong className={styles.logo}>
          <Link to={RoutePath.funnel} className={styles.logo__link}>
            <Logo />
          </Link>
        </strong>
        <Nav user={user} isOpen={isMobile ? isOpen : true} onContentClick={onContentClick} onClick={close} />
        {!isMobile && <UserAvatar user={user} />}
        {isMobile && <Hamburger isOpen={isOpen} onClick={toggle} />}
      </div>
    </header>
  );
});

export default Header;
