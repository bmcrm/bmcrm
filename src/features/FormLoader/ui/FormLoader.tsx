import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import Loader from 'shared/ui/Loader/Loader';
import styles from './FormLoader.module.scss';

type FormLoaderProps = {
  className?: string;
};

const FormLoader = memo(({ className }: FormLoaderProps) => {
  return (
    <div className={classNames(styles.formLoader, {}, [className])}>
      <Loader/>
    </div>
  );
});

export default FormLoader;
