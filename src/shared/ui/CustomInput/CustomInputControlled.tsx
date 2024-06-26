import { memo, useState } from 'react';
import { ErrorMessage, Field } from 'formik';
import styles from './CustomInput.module.scss';
import CustomErrorMessage from '../CustomErrorMessage/CustomErrorMessage';
import Tooltip from '../Tooltip/Tooltip';
import Accept from 'icons/accept.svg';
import Cross from 'icons/cross.svg';
import EyeOpen from 'icons/eye_open.svg';
import EyeClose from 'icons/eye_closed.svg';
import clsx from 'clsx';
import Icon from '../Icon/Icon';
import { createSlug } from 'shared/lib/createSlug/createSlug';

interface CustomInputProps {
  name: string;
  placeholder: string;
  type?: string;
  label?: string;
  register?: boolean;
  value?: string | boolean | string[] | undefined;
  errors?: { [key: string]: string | boolean }[];
  setFieldValue: (field: string, value: string) => void;
}

const CustomInputControlled = memo((props: CustomInputProps) => {
  const {
    setFieldValue,
    name,
    errors,
    register,
    value,
    placeholder,
    type = 'text',
    label,
  } = props;
  const [isFocused, setIsFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const validateDone = errors?.filter(error => !error.valid).length;

  return (
    <label className={styles.label}>
      {label && <p>{label}</p>}
      {type === 'password' && value && isFocused && !!validateDone && (
        <Tooltip
          className={styles.tooltip}
          properties={{
            top: '-120px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '287px',
          }}
        >
          <ul>
            {errors?.map((error, idx) => (
              <li className={clsx(styles.errorText, error.valid ? styles.valid : styles.invalid)} key={idx}>
                <Icon icon={error.valid ? <Accept /> : <Cross />} /> {error.message}
              </li>
            ))}
          </ul>
        </Tooltip>
      )}
      <Field
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          setIsFocused(false);
        }}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          const campName = event.target.value;
          const campId = createSlug(campName);
          setFieldValue('camp_name', campName);
          setFieldValue('camp_id', campId);
        }}
        autoComplete='off'
        className={styles.input}
        name={name}
        type={isOpen ? 'text' : type}
        placeholder={placeholder}
      />

      {type === 'password' && (
        <button type='button' className={styles.eye} onClick={() => setIsOpen(!isOpen)}>
          <Icon icon={isOpen ? <EyeOpen /> : <EyeClose />} />
        </button>
      )}
      {!register && (
        <ErrorMessage className={styles.error} name={name} render={msg => <CustomErrorMessage message={msg} />} />
      )}
    </label>
  );
});

export default CustomInputControlled;