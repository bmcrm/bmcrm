import { memo, useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMedia } from '@shared/hooks/useMedia';
import { classNames } from '@shared/lib/classNames';
import { capitalizedCamperName } from '@shared/lib/capitalizedCamperName';
import { Avatar } from '@shared/ui/Avatar';
import UserAvatarTooltip from '../UserAvatarTooltip/UserAvatarTooltip';
import { useGetCampers } from '@entities/Camper';
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
  const { data: [currentCamper] = [] } = useGetCampers({ camperEmail: decodedIDToken?.email });

  const capitalizedName = useMemo(() => {
    if (!currentCamper) return null;

    const { first_name, last_name, playa_name, email } = currentCamper;

    return capitalizedCamperName({ first_name, last_name, playa_name, email });
  }, [currentCamper]);

  const commonContent = (
    <div className={styles.avatar__info}>
      <h2 className={styles.avatar__name}>{capitalizedName ?? 'Loading...'}</h2>
      <h3 className={styles.avatar__camp}>{currentCamper?.camp_name}</h3>
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
      <Link to={RoutePath.campers} className={classNames(styles.avatar, {}, [className])} onClick={onClick}>
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
