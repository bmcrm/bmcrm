import { memo, useCallback, useEffect, useMemo, useRef, type MouseEvent } from 'react';
import { useMedia } from '@shared/hooks/useMedia';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import { classNames, type Mods } from '@shared/lib/classNames';
import { CustomNavLink, CustomNavLinkTheme } from '@shared/ui/CustomNavLink';
import { UserAvatar, UserAvatarTheme } from '@features/UserAvatar';
import { Button, ButtonColor, ButtonSize, ButtonTheme } from '@shared/ui/Button';
import { Icon, IconSize } from '@shared/ui/Icon';
import { useLogout, userState } from '@entities/User';
import { RoutePath } from '@app/providers/AppRouter';
import { generateNavList } from '../model/data/Nav.data';
import styles from './Nav.module.scss';
import SettingsIcon from '@shared/assets/icons/settings_icon.svg';
import LogoutIcon from '@shared/assets/icons/logout_icon.svg';

type NavProps = {
  className?: string;
  isOpen?: boolean;
  handleCLose?: () => void;
};

const Nav = memo((props: NavProps) => {
  const { className, isOpen, handleCLose } = props;
  const navRef = useRef<HTMLElement>(null);
  const { isTablet } = useMedia();
  const { mutate: logout } = useLogout();
  const {
    tokens: { decodedIDToken },
  } = userState();
  console.log(decodedIDToken);

  const mods: Mods = {
    [styles.open]: isOpen,
  };

  useEffect(() => {
    if (isTablet && isOpen && navRef.current) {
      disableBodyScroll(navRef.current);
    }

    return () => clearAllBodyScrollLocks();
  }, [isTablet, isOpen]);

  const handleLogout = useCallback(() => {
    handleCLose?.();
    logout();
  }, [handleCLose, logout]);

  const handleNavClick = useCallback(
    (e: MouseEvent) => {
      if (e.target === navRef.current) {
        handleCLose?.();
      }
    },
    [handleCLose]
  );
  const filteredNavItems = useMemo(() => {
    if (!decodedIDToken) return [];

    const allItems = generateNavList(decodedIDToken.camp_id);

    return allItems.filter(item => !item.hidden || decodedIDToken.role === 'tco');
  }, [decodedIDToken]);
  return (
    <nav ref={navRef} className={classNames(styles.nav, mods, [className])} onClick={handleNavClick}>
      <div className={styles.nav__inner}>
        {isTablet && <UserAvatar theme={UserAvatarTheme.MOBILE} onClick={handleCLose} />}
        <ul className={styles.nav__list}>
          {filteredNavItems.map(item => (
            <li key={item.path}>
              <CustomNavLink link={item} onClick={handleCLose} />
            </li>
          ))}
          {isTablet && (
            <>
              <li>
                <CustomNavLink
                  theme={CustomNavLinkTheme.ICON}
                  link={{
                    path: RoutePath.settings_account,
                    text: 'Setting',
                    icon: <SettingsIcon />,
                  }}
                  onClick={handleCLose}
                />
              </li>
              <li>
                <Button theme={ButtonTheme.CLEAR} size={ButtonSize.TEXT} color={ButtonColor.NEUTRAL} onClick={handleLogout} style={{ gap: 10 }}>
                  <Icon icon={<LogoutIcon />} size={IconSize.SIZE_20} />
                  Log Out
                </Button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
});

export default Nav;
