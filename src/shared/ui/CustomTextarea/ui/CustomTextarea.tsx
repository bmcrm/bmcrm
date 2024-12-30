import { memo } from 'react';
import { ErrorMessage, Field } from 'formik';
import { classNames } from '@shared/lib/classNames';
import { CustomErrorMessage } from '@shared/ui/CustomErrorMessage';
import styles from './CustomTextarea.module.scss';

type CustomTextareaProps = {
  className?: string;
  name: string;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  readonly?: boolean;
};

const CustomTextarea = memo((props: CustomTextareaProps) => {
  const { className, name, placeholder, label, disabled, readonly } = props;

  return (
    <label className={classNames(styles.label, {}, [className])}>
      {label && <p>{label}</p>}
      <Field
        as={'textarea'}
        rows={3}
        className={styles.textarea}
        name={name}
        readOnly={readonly}
        placeholder={placeholder}
        disabled={disabled}
      />
      <ErrorMessage name={name} render={msg => <CustomErrorMessage message={msg} />} />
    </label>
  );
});

export default CustomTextarea;
