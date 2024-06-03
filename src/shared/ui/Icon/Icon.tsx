import styles from './Icon.module.scss';
import { memo, ReactNode } from 'react';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { IconSize } from './IconTypes';

type IconProps = {
  className?: string;
  icon: ReactNode;
  size?: IconSize;
};

const Icon = memo((props: IconProps) => {
  const {
    className,
    icon,
    size = IconSize.SIZE_16,
  } = props;

  const mods: Mods = {
    [styles[size]]: size,
  };

  return (
    <span className={classNames(styles.icon, mods, [className])}>
      {icon}
    </span>
  );
});

export default Icon;
