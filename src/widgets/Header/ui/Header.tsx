import { memo } from 'react';
import { useMedia } from '@shared/hooks/useMedia';
import { useToggle } from '@shared/hooks/useToggle';
import { classNames } from '@shared/lib/classNames';
import { Nav } from '@features/Nav';
import { Hamburger } from '@features/Hamburger';
import { Logo } from '@shared/ui/Logo';
import { UserAvatar } from '@features/UserAvatar';
import styles from './Header.module.scss';

type HeaderProps = {
  className?: string;
};

const Header = memo(({ className }: HeaderProps) => {
  const { isMobile } = useMedia();
  const { isOpen, toggle, close } = useToggle();

  return (
    <header className={classNames(styles.header, {}, [className])}>
      <div className={styles.header__container}>
        <Logo />
        <Nav isOpen={isMobile ? isOpen : true} handleCLose={close} />
        {!isMobile && <UserAvatar />}
        {isMobile && <Hamburger isOpen={isOpen} onClick={toggle} />}
      </div>
    </header>
  );
});

export default Header;
