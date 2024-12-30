import { memo, type CSSProperties } from 'react';
import { classNames } from '@shared/lib/classNames';
import AnonymousAvatar from '@shared/assets/images/avatars/avatar.png';
import styles from './Avatar.module.scss';

type AvatarProps = {
  className?: string;
  src?: string | null;
  alt?: string;
  size?: CSSProperties['width'];
};

const Avatar = memo((props: AvatarProps) => {
  const { className, src, alt = 'img desc', size = 100 } = props;

  const sizes: CSSProperties = {
    width: size,
  };

  return (
    <div className={classNames(styles.avatar, {}, [className])} style={sizes}>
      <picture>
        <img src={src ? src : AnonymousAvatar} alt={alt} />
      </picture>
    </div>
  );
});

export default Avatar;
