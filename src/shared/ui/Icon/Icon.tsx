import { CSSProperties, memo, ReactNode } from 'react';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import styles from './Icon.module.scss';
import { IconSize } from './Icon.types';

type IconProps = {
  className?: string;
  icon: ReactNode;
  size?: IconSize;
  style?: CSSProperties;
};

const Icon = memo((props: IconProps) => {
  const {
    className,
    icon,
    size = IconSize.SIZE_16,
    style,
  } = props;

  const mods: Mods = {
    [styles[size]]: size,
  };

  return <span className={classNames(styles.icon, mods, [className])} style={style}>{icon}</span>;
});

export default Icon;
