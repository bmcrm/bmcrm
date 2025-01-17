import { memo, useState, useEffect, type InputHTMLAttributes, type ReactNode } from 'react';
import { Field, useFormikContext, ErrorMessage, type FormikValues } from 'formik';
import { classNames } from '@shared/lib/classNames';
import { createSlug } from '@shared/lib/createSlug';
import { Icon } from '@shared/ui/Icon';
import { Tooltip } from '@shared/ui/Tooltip';
import { CustomErrorMessage } from '@shared/ui/CustomErrorMessage';
import { Button, ButtonSize, ButtonTheme } from '@shared/ui/Button';
import { validatePassword } from '../lib/validatePassword';
import { CustomInputTheme } from '../model/types/CustomInput.types';
import styles from './CustomInput.module.scss';
import Accept from '@shared/assets/icons/accept.svg';
import Cross from '@shared/assets/icons/cross.svg';
import EyeOpen from '@shared/assets/icons/eye_open.svg';
import EyeClose from '@shared/assets/icons/eye_closed.svg';

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  theme?: CustomInputTheme;
  type?: string;
  label?: string | ReactNode;
  controlledInputName?: string;
}

const CustomInput = memo((props: CustomInputProps) => {
  const {
    className,
    theme = CustomInputTheme.DEFAULT,
    type = 'text',
    label,
    controlledInputName,
    ...rest
  } = props;
  const [isFocused, setIsFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { values, setFieldValue } = useFormikContext<FormikValues>();
  const isPasswordTooltip = theme === CustomInputTheme.PASSWORD_TOOLTIP;
  const isPasswordNoTooltip = theme === CustomInputTheme.PASSWORD_NO_TOOLTIP;
  const isControlled = theme === CustomInputTheme.CONTROLLED;
  const errors = isPasswordTooltip ? validatePassword(values.password) : null;
  const isValid = errors?.filter(error => !error.valid).length;

  useEffect(() => {
    if (isControlled && controlledInputName && rest.name) {
      const campId = createSlug(values[rest.name]);
      void setFieldValue(controlledInputName, campId);
    }
  }, [controlledInputName, isControlled, rest.name, setFieldValue, values]);

  return (
    <label className={classNames(styles.input, {}, [className])}>
      {label && <p className={styles.input__caption}>{label}</p>}
      {isPasswordTooltip && isFocused && !!isValid && (
        <Tooltip
          className={styles.tooltip}
          properties={{
            top: '-100px',
            left: '60%',
            transform: 'translateX(-50%)',
            width: '290px',
          }}
        >
          <ul>
            {errors?.map((error, i) => (
              <li className={classNames(styles.tooltip__item, { [styles.valid]: error.valid }, [])} key={i}>
                <Icon icon={error.valid ? <Accept /> : <Cross />} /> {error.message}
              </li>
            ))}
          </ul>
        </Tooltip>
      )}
      <Field
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={styles.input__field}
        type={isOpen ? 'text' : type}
        {...rest}
      />
      {(isPasswordTooltip || isPasswordNoTooltip) && (
        <Button
          className={styles.input__btn}
          theme={ButtonTheme.CLEAR}
          size={ButtonSize.TEXT}
          onClick={() => setIsOpen(!isOpen)}
        >
          <Icon icon={isOpen ? <EyeOpen /> : <EyeClose />} />
        </Button>
      )}
      <ErrorMessage name={rest.name ?? ''} render={msg => <CustomErrorMessage message={msg} />} />
    </label>
  );
});

export default CustomInput;
