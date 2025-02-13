import { memo } from 'react';
import { ErrorMessage, Field } from 'formik';
import { classNames } from '@shared/lib/classNames';
import { CustomErrorMessage } from '@shared/ui/CustomErrorMessage';
import styles from './FormikCheckbox.module.scss';

type FormikCheckboxProps = {
  className?: string;
  name: string;
  label?: string;
  disabled?: boolean;
  value?: string;
  errorMessage?: boolean;
  ariaLabel?: string;
};

const FormikCheckbox = memo((props: FormikCheckboxProps) => {
  const {
    className,
    name,
    label,
    disabled,
    value,
    errorMessage = false,
    ariaLabel,
  } = props;

  return (
    <label className={classNames(styles.checkbox, {}, [className])} aria-label={ariaLabel}>
      <Field
        type={'checkbox'}
        disabled={disabled}
        className={styles.input}
        name={name}
        value={value}
      />
      <p className={styles.label}>{label}</p>
      {errorMessage && <ErrorMessage name={name} render={msg => <CustomErrorMessage message={msg} />} />}
    </label>
  );
});

export default FormikCheckbox;
