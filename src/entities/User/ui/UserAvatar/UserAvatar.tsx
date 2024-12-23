import { memo, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMedia } from '@shared/hooks/useMedia';
import { classNames } from '@shared/lib/classNames';
import { Avatar } from '@shared/ui/Avatar';
import UserAvatarTooltip from '../UserAvatarTooltip/UserAvatarTooltip';
import { RoutePath } from '@app/providers/AppRouter';
import { userState } from '../../model/state/userState';
import { IUserAvatar } from '../../model/types/UserAvatar.types';
import styles from './UserAvatar.module.scss';

type UserAvatarProps = {
  className?: string;
  user?: IUserAvatar | null;
  theme?: 'default' | 'mobile';
};

const UserAvatar = memo(({ className, user, theme = 'default' }: UserAvatarProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { isTablet } = useMedia();
  const { tokens: { decodedIDToken } } = userState();

  const mouseEnterHandler = () => {
    setIsHovered(true);
  };

  const mouseLeaveHandler = useCallback(() => {
    setIsHovered(false);
  }, []);

  if (theme === 'mobile') {
    return (
      <Link to={RoutePath.funnel} className={classNames(styles.userAvatar, {}, [className])}>
        <Avatar size={42} alt={user ? user.name : 'avatar'} src={user ? user.avatar : null} />
        <section className={styles.userAvatar__infoWrapper}>
          <h2 className={styles.userAvatar__name}>{user ? user.name : 'Anonymous'}</h2>
          <h3 className={styles.userAvatar__camp}> {decodedIDToken?.camp_name}</h3>
        </section>
      </Link>
    );
  }

  return (
    <div
      className={classNames(styles.userAvatar, {}, [className])}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
    >
      <section className={styles.userAvatar__infoWrapper}>
        <h2 className={styles.userAvatar__name}>{user ? user.name : 'Anonymous'}</h2>
        <h3 className={styles.userAvatar__camp}> {decodedIDToken?.camp_name}</h3>
      </section>
      <Avatar size={isTablet ? 30 : 40} alt={user ? user.name : 'avatar'} src={user ? user.avatar : null} />
      {isHovered && <UserAvatarTooltip onClick={mouseLeaveHandler} />}
    </div>
  );
});

export default UserAvatar;
