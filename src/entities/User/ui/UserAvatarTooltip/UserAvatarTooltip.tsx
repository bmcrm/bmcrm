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

type UserAvatarTooltipProps = {
  className?: string;
  onClick?: () => void;
};

const UserAvatarTooltip = memo(({ className, onClick }: UserAvatarTooltipProps) => {
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
          <Link
            to={RoutePath.profile}
            className={styles.userTooltip__link}
            onClick={onClick}
          >
            <Icon icon={<SettingsIcon/>} size={IconSize.SIZE_24}/>
            <span className={styles.text}>Setting</span>
          </Link>
        </li>
        <li>
          <Link
            to={'/logout'}
            className={styles.userTooltip__link}
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

export default UserAvatarTooltip;
