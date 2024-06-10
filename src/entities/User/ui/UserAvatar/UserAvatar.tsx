import { memo, useCallback, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import Avatar from 'shared/ui/Avatar/Avatar';
import UserAvatarTooltip from '../UserAvatarTooltip/UserAvatarTooltip';
import styles from './UserAvatar.module.scss';

export interface IUserAvatar {
  name?: string;
  avatar?: string | null;
}

type UserAvatarProps = {
  className?: string;
  user?: IUserAvatar | null;
};

const UserAvatar = memo(({ className, user }: UserAvatarProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const mouseEnterHandler = () => {
    setIsHovered(true);
  };

  const mouseLeaveHandler = useCallback(() => {
    setIsHovered(false);
  }, []);

  return (
    <div
      className={classNames(styles.userAvatar, {}, [className])}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
    >
      <h2 className={styles.userAvatar__name}>{user ? user.name : 'Anonymous'}</h2>
      <Avatar size={40} alt={user ? user.name : 'avatar'} src={user ? user.avatar : null}/>
      {isHovered && <UserAvatarTooltip onClick={mouseLeaveHandler} />}
    </div>
  );
});

export default UserAvatar;
