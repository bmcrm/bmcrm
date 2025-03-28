import { memo, type InputHTMLAttributes } from 'react';
import { Field, ErrorMessage } from 'formik';
import { classNames } from '@shared/lib/classNames';
import { CustomErrorMessage } from '@shared/ui/CustomErrorMessage';
import styles from './FormikTextarea.module.scss';

interface FormikTextareaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  label?: string;
  name: string;
}

const FormikTextarea = memo((props: FormikTextareaProps) => {
  const { className, label, name, ...rest } = props;

  return (
    <label className={classNames(styles.textarea, {}, [className])}>
      {label && <p className={styles.textarea__caption}>{label}</p>}
      <Field
        as={'textarea'}
        rows={3}
        className={styles.textarea__field}
        name={name}
        {...rest}
      />
      <ErrorMessage name={name} render={msg => <CustomErrorMessage message={msg} />} />
    </label>
  );
});

export default FormikTextarea;
