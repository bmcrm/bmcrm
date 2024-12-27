import { memo, useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMedia } from '@shared/hooks/useMedia';
import { classNames } from '@shared/lib/classNames';
import { Avatar } from '@shared/ui/Avatar';
import UserAvatarTooltip from '../UserAvatarTooltip/UserAvatarTooltip';
import { userState } from '@entities/User';
import { RoutePath } from '@app/providers/AppRouter';
import { UserAvatarTheme } from '../../model/types/UserAvatar.types';
import styles from './UserAvatar.module.scss';

type UserAvatarProps = {
  className?: string;
  theme?: UserAvatarTheme;
  onClick?: () => void;
};

const UserAvatar = memo((props: UserAvatarProps) => {
  const { className, theme = UserAvatarTheme.PRIMARY, onClick } = props;
  const [isHovered, setIsHovered] = useState(false);
  const { isTablet } = useMedia();
  const { tokens: { decodedIDToken } } = userState();

  const capitalizedName = useMemo(() => {
    if (!decodedIDToken) return null;

    const { first_name, last_name, playa_name, email } = decodedIDToken;

    const firstLastName = first_name && last_name ? `${first_name} ${last_name}` : null;
    const name = playa_name || firstLastName || email;

    console.log('first_name:', first_name);
    console.log('last_name:', last_name);
    console.log('name:', name);

    return name
      ?.split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }, [decodedIDToken]);

  const commonContent = (
    <div className={styles.avatar__info}>
      <h2 className={styles.avatar__name}>{capitalizedName ?? 'Anonymous'}</h2>
      <h3 className={styles.avatar__camp}>{decodedIDToken?.camp_name}</h3>
    </div>
  );

  const mouseEnterHandler = () => {
    setIsHovered(true);
  };

  const mouseLeaveHandler = useCallback(() => {
    setIsHovered(false);
  }, []);

  if (theme === UserAvatarTheme.MOBILE) {
    return (
      <Link to={RoutePath.funnel} className={classNames(styles.avatar, {}, [className])} onClick={onClick}>
        <Avatar size={42} alt={capitalizedName ?? 'avatar'} src={null} />
        {commonContent}
      </Link>
    );
  }

  return (
    <div
      className={classNames(styles.avatar, {}, [className])}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
    >
      {commonContent}
      <Avatar size={isTablet ? 30 : 40} alt={capitalizedName ?? 'avatar'} src={null} />
      {isHovered && <UserAvatarTooltip onClick={mouseLeaveHandler} />}
    </div>
  );
});

export default UserAvatar;
