import styles from './ProfileAvatarTooltip.module.scss';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { RoutePath } from 'app/providers/AppRouter';
import { classNames } from 'shared/lib/classNames/classNames';
import Tooltip from 'shared/ui/Tooltip/Tooltip';
import Icon from 'shared/ui/Icon/Icon';
import { IconSize } from 'shared/ui/Icon/IconTypes';
import SettingsIcon from 'shared/assets/icons/settings_icon.svg';
import LogoutIcon from 'shared/assets/icons/logout_icon.svg';

type ProfileAvatarTooltipProps = {
	className?: string;
	onClick?: () => void;
};

const ProfileAvatarTooltip = memo(({ className, onClick }: ProfileAvatarTooltipProps) => {
	return (
		<Tooltip
			className={classNames(styles.profileTooltip, {}, [className])}
			properties={{
				top: 'calc(100% + 10px)',
				left: '50%',
				transform: 'translateX(-50%)',
				width: '180px',
			}}
		>
			<ul className={styles.profileTooltip__list}>
				<li>
					<Link
						to={RoutePath.profile}
						className={styles.profileTooltip__link}
						onClick={onClick}
					>
						<Icon icon={<SettingsIcon/>} size={IconSize.SIZE_24}/>
						<span className={styles.text}>Setting</span>
					</Link>
				</li>
				<li>
					<Link
						to={'/logout'}
						className={styles.profileTooltip__link}
						onClick={onClick}
					>
						<Icon icon={<LogoutIcon/>} size={IconSize.SIZE_24}/>
						<span className={styles.text}>Log out</span>
					</Link>
				</li>
			</ul>
		</Tooltip>
	);
});

export default ProfileAvatarTooltip;
