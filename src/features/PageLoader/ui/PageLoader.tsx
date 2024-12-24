import { memo } from 'react';
import { classNames } from '@shared/lib/classNames';
import { Loader } from '@shared/ui/Loader';
import styles from './PageLoader.module.scss';

type PageLoaderProps = {
  className?: string;
};

const PageLoader = memo(({ className }: PageLoaderProps) => (
  <div className={classNames(styles.pageLoader, {}, [className])}><Loader/></div>
));

export default PageLoader;
