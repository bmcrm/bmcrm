import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import styles from './CustomCheckbox.module.scss';

type CustomCheckboxProps = {
  className?: string;
};

const CustomCheckbox = memo(({ className }: CustomCheckboxProps) => {
  return (
    <div className={classNames(styles.checkbox, {}, [className])}>

    </div>
  );
});

export default CustomCheckbox;
