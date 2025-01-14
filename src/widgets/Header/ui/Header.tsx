import { memo } from 'react';
import { useMedia } from '@shared/hooks/useMedia';
import { useToggle } from '@shared/hooks/useToggle';
import { classNames } from '@shared/lib/classNames';
import { Nav } from '@features/Nav';
import { Hamburger } from '@features/Hamburger';
import { Logo } from '@shared/ui/Logo';
import { UserAvatar } from '@features/UserAvatar';
import { HeaderTheme } from '../model/types/Header.types';
import styles from './Header.module.scss';

type HeaderProps = {
  className?: string;
  theme?: HeaderTheme;
};

const Header = memo(({ className, theme = HeaderTheme.DEFAULT }: HeaderProps) => {
  const { isTablet } = useMedia();
  const { isOpen, toggle, close } = useToggle();

  return (
    <header className={classNames(styles.header, {}, [className])}>
      <div className={styles.header__container}>
        <Logo />
        {theme === HeaderTheme.DEFAULT && (
          <>
            <Nav isOpen={isTablet ? isOpen : true} handleCLose={close} />
            {!isTablet && <UserAvatar />}
            {isTablet && <Hamburger isOpen={isOpen} onClick={toggle} />}
          </>
        )}
      </div>
    </header>
  );
});

export default Header;
