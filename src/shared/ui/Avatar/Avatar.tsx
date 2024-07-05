import styles from './Avatar.module.scss';
import { CSSProperties, memo, useMemo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import AnonymousAvatar from 'shared/assets/icons/avatar.svg';

type AvatarProps = {
  className?: string;
  src?: string | null;
  alt?: string;
  size?: number;
};

const Avatar = memo((props: AvatarProps) => {
  const { className, src, alt = 'img desc', size = 100 } = props;

  const sizes = useMemo<CSSProperties>(
    () => ({
      width: size,
    }),
    [size]
  );
  if (!src) {
    return <AnonymousAvatar />;
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
