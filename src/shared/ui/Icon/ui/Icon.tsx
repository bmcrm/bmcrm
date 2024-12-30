import { memo, type CSSProperties, type ReactNode } from 'react';
import { classNames, type Mods } from '@shared/lib/classNames';
import { IconSize } from '../model/types/Icon.types';
import styles from './Icon.module.scss';

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
