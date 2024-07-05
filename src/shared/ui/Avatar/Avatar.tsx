import styles from './Avatar.module.scss';
import { CSSProperties, memo, useMemo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import AnonymousAvatar from 'shared/assets/icons/avatar.svg';
import Icon from '../Icon/Icon';
import { IconSize } from '../Icon/Icon.types';

type AvatarProps = {
  className?: string;
  src?: string | null;
  alt?: string;
  size?: number;
  iconSize?: IconSize;
};

const Avatar = memo((props: AvatarProps) => {
  const { className, src, alt = 'img desc', size = 100, iconSize = IconSize.SIZE_AVATAR_HEADER } = props;

  const sizes = useMemo<CSSProperties>(
    () => ({
      width: size,
    }),
    [size]
  );
  if (!src) {
    return <Icon icon={<AnonymousAvatar />} size={iconSize} />;
  }
  return (
    <div className={classNames(styles.avatar, {}, [className])} style={sizes}>
      <picture>
        <img src={src} alt={alt} />
      </picture>
    </div>
  );
});

export default Avatar;
