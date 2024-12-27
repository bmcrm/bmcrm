import { memo, useCallback, useEffect, useRef } from 'react';
import { useMedia } from '@shared/hooks/useMedia';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import { classNames, type Mods } from '@shared/lib/classNames';
import { CustomNavLink, CustomNavLinkTheme } from '@shared/ui/CustomNavLink';
import { UserAvatar, UserAvatarTheme } from '@features/UserAvatar';
import { Button, ButtonColor, ButtonSize, ButtonTheme } from '@shared/ui/Button';
import { Icon, IconSize } from '@shared/ui/Icon';
import { useLogout } from '@entities/User';
import { RoutePath } from '@app/providers/AppRouter';
import { navItemsList } from '../model/data/Nav.data';
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
	const { isMobile } = useMedia();
	const { mutate: logout } = useLogout();
	const mods: Mods = {
		[styles.open]: isOpen,
	};

	useEffect(() => {
		if (isMobile && isOpen && navRef.current) {
			disableBodyScroll(navRef.current);
		}

		return () => clearAllBodyScrollLocks();
	}, [isMobile, isOpen]);

	const handleLogout = useCallback(() => {
		handleCLose?.();
		logout();
	}, [handleCLose, logout])

	return (
		<nav ref={navRef} className={classNames(styles.nav, mods, [className])}>
			<div className={styles.nav__inner}>
				{isMobile && <UserAvatar theme={UserAvatarTheme.MOBILE} onClick={handleCLose} />}
				<ul className={styles.nav__list}>
					{navItemsList.map(item => (
						<li key={item.path}>
							<CustomNavLink link={item} onClick={handleCLose} />
						</li>
					))}
					{isMobile && (
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
								<Button
									theme={ButtonTheme.CLEAR}
									size={ButtonSize.TEXT}
									color={ButtonColor.NEUTRAL}
									onClick={handleLogout}
									style={{ gap: 10 }}
								>
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
