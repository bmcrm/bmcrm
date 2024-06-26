import { ChangeEvent, memo, useEffect, useMemo, useState } from 'react';
import { ErrorMessage, Field, useFormikContext } from 'formik';
import { classNames } from 'shared/lib/classNames/classNames';
import { SelectOptions } from './CustomSelect.types';
import CustomErrorMessage from 'shared/ui/CustomErrorMessage/CustomErrorMessage';
import styles from './CustomSelect.module.scss';

interface CustomSelectProps {
  className?: string;
  name: string;
  label?: string;
  disabled?: boolean;
  options?: SelectOptions[];
  withDefault?: boolean;
}

const CustomSelect = memo((props: CustomSelectProps) => {
  const {
    className,
    disabled,
    name,
    label,
    options,
    withDefault,
    ...otherProps
  } = props;
  const [isDefaultSelected, setIsDefaultSelected] = useState(true);
  const { setFieldValue } = useFormikContext();

  useEffect(() => {
    if (!withDefault) {
      setIsDefaultSelected(false);
    }
  }, [withDefault]);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setIsDefaultSelected(value === '');
    void setFieldValue(name, value);
  };

  const optionsList = useMemo(() => {
    const list = options?.map(({ value, content }) =>
      <option key={value} value={value}>{content}</option>
    ) || [];

    if (withDefault) {
      list.unshift(<option key={'default'} value={''} disabled>Select</option>);
    }

    return list;
  }, [options, withDefault]);

  return (
    // <label className={styles.label}>
    <label className={classNames(styles.label, {}, [className])}>
      {label && <p>{label}</p>}
      <Field
        as={'select'}
        className={classNames(styles.select, { [styles.default]: isDefaultSelected }, [])}
        onChange={handleChange}
        disabled={disabled}
        name={name}
        defaultValue={withDefault ? '' : undefined}
        {...otherProps}
      >
        {optionsList || <option disabled value='' selected>No content</option>}
      </Field>
      <ErrorMessage className={styles.error} name={name} render={msg => <CustomErrorMessage message={msg} />} />
    </label>
  );
});

export default CustomSelect;
