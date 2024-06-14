import React, { CSSProperties, memo, useMemo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { ProgressColors } from 'shared/ui/Progress/Progress.types';
import styles from './Progress.module.scss';

type ProgressProps = {
  className?: string;
  count: number | string;
  color: ProgressColors;
  barWidth: number | string;
  symbol?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
};

const Progress = memo((props: ProgressProps) => {
  const {
    className,
    count,
    color,
    barWidth,
    symbol,
    onClick,
  } = props;

  const width = useMemo<CSSProperties>(() => ({
    width: barWidth,
  }), [barWidth]);

  return (
    <div className={classNames(styles.progress, {}, [className, styles[color]])} onClick={onClick}>
      <p className={styles.progress__caption}>
        {count} <span className={styles.small}>user{+count > 1 ? 's' : ''}{symbol && <span className={styles.symbol}>*</span>}</span>
      </p>
      <span className={styles.progress__bar}>
        <span className={styles.bar} style={width}></span>
      </span>
    </div>
  );
});

export default Progress;
