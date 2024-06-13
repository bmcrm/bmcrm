import { CSSProperties, memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import Loader from 'shared/ui/Loader/Loader';
import styles from './FormLoader.module.scss';

type FormLoaderProps = {
  className?: string;
  style?: CSSProperties;
};

const FormLoader = memo(({ className, style }: FormLoaderProps) => {
  return (
    <div className={classNames(styles.formLoader, {}, [className])} style={style}>
      <Loader/>
    </div>
  );
});

export default FormLoader;
