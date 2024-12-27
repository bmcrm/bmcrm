import { memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { classNames } from '@shared/lib/classNames';
import { Icon, IconSize } from '@shared/ui/Icon';
import { Button, ButtonColor, ButtonSize, ButtonTheme } from '@shared/ui/Button';
import { useLogout } from '@entities/User';
import { RoutePath } from '@app/providers/AppRouter';
import styles from './UserAvatarTooltip.module.scss';
import SettingsIcon from '@shared/assets/icons/settings_icon.svg';
import LogoutIcon from '@shared/assets/icons/logout_icon.svg';

type UserAvatarTooltipProps = {
  className?: string;
  onClick?: () => void;
};

const UserAvatarTooltip = memo(({ className, onClick }: UserAvatarTooltipProps) => {
  const { mutate: logout } = useLogout();

  const handleLogout = useCallback(() => {
    onClick?.();
    logout();
  }, [logout, onClick]);

  return (
    <div className={classNames(styles.tooltip, {}, [className])}>
      <ul className={styles.tooltip__list}>
        <li>
          <Link
            to={RoutePath.settings_account}
            className={classNames(styles.tooltip__link, {}, [])}
            onClick={onClick}
          >
            <Icon icon={<SettingsIcon />} size={IconSize.SIZE_24} />
            <span className={styles.text}>Setting</span>
          </Link>
        </li>
        <li>
          <Button
            theme={ButtonTheme.CLEAR}
            size={ButtonSize.TEXT}
            color={ButtonColor.BLACK}
            className={styles.tooltip__btn}
            onClick={handleLogout}
          >
            <Icon icon={<LogoutIcon />} size={IconSize.SIZE_24} />
            Log out
          </Button>
        </li>
      </ul>
    </div>
  );
});

export default UserAvatarTooltip;
