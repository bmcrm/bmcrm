import { memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { classNames } from '@shared/lib/classNames';
import { Icon, IconSize } from '@shared/ui/Icon';
import { Button, ButtonColor, ButtonSize, ButtonTheme } from '@shared/ui/Button';
import { useLogout } from '@entities/User';
import { links } from '../../model/data/userAvatar.data';
import styles from './UserAvatarTooltip.module.scss';
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
        {links.map(({ to, text, icon }) => (
          <li key={text}>
            <Link to={to} className={styles.tooltip__link} onClick={onClick}>
              <Icon icon={icon} size={IconSize.SIZE_24} />
              <span className={styles.text}>{text}</span>
            </Link>
          </li>
        ))}
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
