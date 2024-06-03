import styles from './Progress.module.scss';
import { CSSProperties, memo, useMemo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { ProgressColors } from 'shared/ui/Progress/ProgressTypes';

type ProgressProps = {
  className?: string;
  count: number | string;
  color: ProgressColors;
  barWidth: number | string;
};

const Progress = memo((props: ProgressProps) => {
  const {
    className,
    count,
    color,
    barWidth,
  } = props;

  const width = useMemo<CSSProperties>(() => ({
    width: barWidth,
  }), [barWidth]);

  return (
    <div className={classNames(styles.progress, {}, [className, styles[color]])}>
      <p className={styles.progress__caption}>{count} <span className={styles.small}>users</span></p>
      <span className={styles.progress__bar}>
        <span className={styles.bar} style={width}></span>
      </span>
    </div>
  );
});

export default Progress;
