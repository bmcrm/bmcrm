import { ChangeEvent, memo, useMemo, useState } from 'react';
import { ErrorMessage, Field, useFormikContext } from 'formik';
import { classNames } from 'shared/lib/classNames/classNames';

import CustomErrorMessage from '../CustomErrorMessage/CustomErrorMessage';
import styles from './CustomSelect.module.scss';

interface CustomSelectProps {
  name: string;
  label?: string;
  disabled?: boolean;
  options?: SelectOptions[];
  as?: string;
  errors?: { [key: string]: string | boolean }[];
}

export type SelectOptions = {
  value: string;
  content: string;
};

const CustomSelect = memo((props: CustomSelectProps) => {
  const {
    disabled,
    name,
    errors,
    label,
    as = 'select',
    options,
    ...otherProps
  } = props;
  const [isDefaultSelected, setIsDefaultSelected] = useState(true);
  const { setFieldValue } = useFormikContext();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setIsDefaultSelected(value === '');
    setFieldValue(name, value);
  };

  const optionsList = useMemo(() => options?.map(({ value, content }) =>
    <option key={value} value={value}>{content}</option>), [options]);

  return (
    <label className={styles.label}>
      {label && <p>{label}</p>}
      <Field
        className={classNames(styles.select, { [styles.default]: isDefaultSelected }, [])}
        onChange={handleChange}
        as={as}
        disabled={disabled}
        name={name}
        {...otherProps}
      >
        <option value='' disabled>Select</option>
        {optionsList ? optionsList : <option disabled value='' selected>No content</option>}
      </Field>
      <ErrorMessage className={styles.error} name={name} render={msg => <CustomErrorMessage message={msg} />} />
    </label>
  );
});

export default CustomSelect;
