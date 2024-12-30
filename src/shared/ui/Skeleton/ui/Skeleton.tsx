import { memo, type CSSProperties } from 'react';
import { classNames } from '@shared/lib/classNames';
import styles from './Skeleton.module.scss';

type SkeletonProps = {
  className?: string;
  height?: string | number;
  width?: string | number;
  border?: string;
};

const Skeleton = memo((props: SkeletonProps) => {
  const {
    className,
    height,
    width,
    border,
  } = props;

  const style: CSSProperties = {
    width,
    height,
    borderRadius: border,
  };

  return <div className={classNames(styles.skeleton, {}, [className])} style={style} />;
});

export default Skeleton;
