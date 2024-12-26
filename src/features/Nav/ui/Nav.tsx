import { memo, type MouseEvent } from 'react';
import { useMedia } from '@shared/hooks/useMedia';
import { classNames, type Mods } from '@shared/lib/classNames';
import { CustomNavLink } from '@shared/ui/CustomNavLink';
import { UserAvatar, type IUserAvatar, userState } from '@entities/User';
import { RoutePath } from '@app/providers/AppRouter';
import { navItemsList } from '../model/data/Nav.data';
import { CustomNavLinkTheme } from '@shared/ui/CustomNavLink';
import styles from './Nav.module.scss';
import SettingsIcon from '@shared/assets/icons/settings_icon.svg';
import LogoutIcon from '@shared/assets/icons/logout_icon.svg';

type NavProps = {
	className?: string;
	user?: IUserAvatar | null;
	isOpen?: boolean;
	onClick?: () => void;
	onContentClick?: (e: MouseEvent) => void;
};

const Nav = memo((props: NavProps) => {
	const { className, user, isOpen, onClick, onContentClick } = props;
	const { tokens: { decodedIDToken } } = userState();
	const { isMobile } = useMedia();
	const mods: Mods = {
		[styles.open]: isOpen,
	};

	return (
		<nav className={classNames(styles.nav, mods, [className])} onClick={onClick}>
			<div className={styles.nav__inner} onClick={onContentClick}>
				{isMobile && <UserAvatar theme={'mobile'} user={user}/>}
				<ul className={styles.nav__list}>
					{navItemsList.map(item => {
						if (item.text === 'Camp') {
							return (
								<li key={item.path}>
									<CustomNavLink link={{
										text: item.text,
										icon: item.icon,
										path: `${RoutePath.camp_overview}${decodedIDToken?.camp_id}`
									}}/>
								</li>
							);
						}

						return (
							<li key={item.path}>
								<CustomNavLink link={item}/>
							</li>
						);
					})}
					{isMobile && (
						<>
							<li>
								<CustomNavLink
									link={{
										path: RoutePath.settings_account,
										text: 'Setting',
										icon: <SettingsIcon/>,
									}}
									theme={CustomNavLinkTheme.ICON}
								/>
							</li>
							<li>
								<CustomNavLink
									link={{
										path: RoutePath.sign_in,
										text: 'Log Out',
										icon: <LogoutIcon/>,
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
