import { ErrorMessage, Field } from 'formik';
import styles from './CustomInput.module.scss';
import CustomErrorMessage from '../CustomErrorMessage/CustomErrorMessage';

interface CustomInputProps {
  name: string;
  placeholder: string;
  type?: string;
  label?: string;
}
export const CustomInput = ({ name, placeholder, type = 'text', label }: CustomInputProps) => {
  return (
    <label className={styles.label}>
      {label && <p>{label}</p>}
      <Field autoComplete='off' className={styles.input} name={name} type={type} placeholder={placeholder} />
      <ErrorMessage className={styles.error} name={name} render={msg => <CustomErrorMessage message={msg} />} />
    </label>
  );
};
