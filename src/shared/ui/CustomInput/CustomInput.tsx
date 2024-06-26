import { memo, useState } from 'react';
import { ErrorMessage, Field } from 'formik';
import clsx from 'clsx';
import Icon from 'shared/ui/Icon/Icon';
import Tooltip from 'shared/ui/Tooltip/Tooltip';
import CustomErrorMessage from 'shared/ui/CustomErrorMessage/CustomErrorMessage';
import styles from './CustomInput.module.scss';
import Accept from 'icons/accept.svg';
import Cross from 'icons/cross.svg';
import EyeOpen from 'icons/eye_open.svg';
import EyeClose from 'icons/eye_closed.svg';

interface CustomInputProps {
  name: string;
  className: string;
  placeholder?: string;
  type?: string;
  register?: boolean;
  label?: string;
  value?: string | boolean | string[] | undefined;
  disabled?: boolean;
  errors?: { [key: string]: string | boolean }[];
  readonly?: boolean;
}

const CustomInput = memo((props: CustomInputProps) => {
  const {
    className,
    disabled,
    name,
    errors,
    value,
    placeholder,
    register,
    type = 'text',
    label,
    readonly,
  } = props;
  const [isFocused, setIsFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const validateDone = errors?.filter(error => !error.valid).length;

  return (
    <label className={clsx(styles.label, className)}>
      {label && <p>{label}</p>}
      {type === 'password' && value && isFocused && !!validateDone && (
        <Tooltip
          className={styles.tooltip}
          properties={{
            top: '-100px',
            left: '60%',
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
        disabled={disabled}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        autoComplete='off'
        className={styles.input}
        name={name}
        type={isOpen ? 'text' : type}
        placeholder={placeholder}
        readOnly={readonly}
      />

      {type === 'password' && (
        <button type='button' className={styles.eye} onClick={() => setIsOpen(!isOpen)}>
          <Icon icon={isOpen ? <EyeOpen /> : <EyeClose />} />
        </button>
      )}
      {!register && <ErrorMessage name={name} render={msg => <CustomErrorMessage message={msg} />} />}
    </label>
  );
});

export default CustomInput;
