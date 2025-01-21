import { memo } from 'react';
import { ErrorMessage, Field } from 'formik';
import { classNames } from '@shared/lib/classNames';
import { CustomErrorMessage } from '@shared/ui/CustomErrorMessage';
import styles from './FormikRadio.module.scss';

type FormikRadioProps = {
  className?: string;
  name: string;
  label: string;
  disabled?: boolean;
  value: string;
  errorMessage?: boolean;
};

const FormikRadio = memo((props: FormikRadioProps) => {
  const {
    className,
    name,
    label,
    disabled,
    value,
    errorMessage = false,
  } = props;

  return (
    <label className={classNames(styles.radio, {}, [className])}>
      <Field
        type={'radio'}
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

export default FormikRadio;
