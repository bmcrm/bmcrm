import styles from './Loader.module.scss';
import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';

type LoaderProps = {
  className?: string;
};

const Loader = memo(({ className }: LoaderProps) => {
  return <span className={classNames(styles.loader, {}, [className])}></span>;
});

export default Loader;
