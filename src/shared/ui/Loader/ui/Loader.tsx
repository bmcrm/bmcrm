import { memo } from 'react';
import { classNames } from '@shared/lib/classNames';
import styles from './Loader.module.scss';

type LoaderProps = {
  className?: string;
};

const Loader = memo(({ className }: LoaderProps) =>
  <span className={classNames(styles.loader, {}, [className])}></span>);

export default Loader;
