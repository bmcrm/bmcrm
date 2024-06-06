import styles from './UserAvatarTooltip.module.scss';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { RoutePath } from 'app/providers/AppRouter';
import { classNames } from 'shared/lib/classNames/classNames.ts';
import Tooltip from 'shared/ui/Tooltip/Tooltip.tsx';
import Icon from 'shared/ui/Icon/Icon.tsx';
import { IconSize } from 'shared/ui/Icon/IconTypes.ts';
import SettingsIcon from 'shared/assets/icons/settings_icon.svg';
import LogoutIcon from 'shared/assets/icons/logout_icon.svg';
import useAuth from 'entities/User/model/services/useAuth/useAuth';

type UserAvatarTooltipProps = {
  className?: string;
  onClick?: () => void;
};

const UserAvatarTooltip = memo(({ className, onClick }: UserAvatarTooltipProps) => {
  const logout = useAuth(state => state.logout);

  const handleLogout = () => {
    onClick?.();
    logout();
  };

  return (
    <Tooltip
      className={classNames(styles.userTooltip, {}, [className])}
      properties={{
        top: 'calc(100% + 10px)',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '180px',
      }}
    >
      <ul className={styles.userTooltip__list}>
        <li>
          <Link to={RoutePath.profile} className={classNames(styles.userTooltip__link, {}, [styles.disabled])} onClick={onClick}>
            <Icon icon={<SettingsIcon />} size={IconSize.SIZE_24} />
            <span className={styles.text}>Setting</span>
          </Link>
        </li>
        <li>
          <button className={styles.userTooltip__link} onClick={handleLogout}>
            <Icon icon={<LogoutIcon />} size={IconSize.SIZE_24} />
            <span className={styles.text}>Log out</span>
          </button>
        </li>
      </ul>
    </Tooltip>
  );
});

export default UserAvatarTooltip;
