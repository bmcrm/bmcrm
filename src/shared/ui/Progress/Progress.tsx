import styles from './Progress.module.scss';
import { CSSProperties, memo, useMemo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { ProgressColors } from 'shared/ui/Progress/Progress.types';

type ProgressProps = {
  className?: string;
  count: number | string;
  color: ProgressColors;
  barWidth: number | string;
  symbol?: boolean;
};

const Progress = memo((props: ProgressProps) => {
  const {
    className,
    count,
    color,
    barWidth,
    symbol,
  } = props;

  const width = useMemo<CSSProperties>(() => ({
    width: barWidth,
  }), [barWidth]);

  return (
    <div className={classNames(styles.progress, {}, [className, styles[color]])}>
      <p className={styles.progress__caption}>
        {count} <span className={styles.small}>users{symbol && <span className={styles.symbol}>*</span>}</span>
      </p>
      <span className={styles.progress__bar}>
        <span className={styles.bar} style={width}></span>
      </span>
    </div>
  );
});

export default Progress;
