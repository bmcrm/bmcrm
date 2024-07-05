import styles from './Avatar.module.scss';
import { CSSProperties, memo, useMemo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import AnonymousAvatar from 'shared/assets/images/avatars/anonymous.png';
import { IconSize } from '../Icon/Icon.types';

type AvatarProps = {
  className?: string;
  src?: string | null;
  alt?: string;
  size?: number;
  iconSize?: IconSize;
};

const Avatar = memo((props: AvatarProps) => {
  const { className, src, alt = 'img desc', size = 100 } = props;

  const sizes = useMemo<CSSProperties>(
    () => ({
      width: size,
    }),
    [size]
  );

  return (
    <div className={classNames(styles.avatar, {}, [className])} style={sizes}>
      <picture>
        <img src={src ? src : AnonymousAvatar} alt={alt} />
      </picture>
    </div>
  );
});

export default Avatar;
