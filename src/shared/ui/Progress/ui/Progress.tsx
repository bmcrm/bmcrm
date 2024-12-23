import { memo, type MouseEvent, type CSSProperties } from 'react';
import { classNames } from '@shared/lib/classNames';
import { ProgressColors } from '../model/types/Progress.types';
import styles from './Progress.module.scss';

type ProgressProps = {
  className?: string;
  count: number | string;
  color: ProgressColors;
  barWidth: CSSProperties['width'];
  symbol?: boolean;
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
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

  const width: CSSProperties = {
    width: barWidth,
  };

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
