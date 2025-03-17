import { memo, useCallback, type ChangeEvent, type SelectHTMLAttributes } from 'react';
import { useFormikContext, ErrorMessage, type FormikValues } from 'formik';
import { classNames } from '@shared/lib/classNames';
import { CustomErrorMessage } from '@shared/ui/CustomErrorMessage';
import { CustomSelectSize, ISelectOptions } from '../model/types/CustomSelect.types';
import styles from './CustomSelect.module.scss';

interface CustomSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
	className?: string;
	name?: string;
	label?: string;
	fieldSize?: CustomSelectSize;
	options: ISelectOptions[];
}

const CustomSelect = memo((props: CustomSelectProps) => {
	const {
		className,
		name,
		label,
		fieldSize = CustomSelectSize.M,
		options,
		...otherProps
	} = props;
	const { setFieldValue, values } = useFormikContext<FormikValues>();
	const selectedValue = name ? values[name] : '';

	const handleChange = useCallback(
		(e: ChangeEvent<HTMLSelectElement>) => {
			if (!name) return;

			const value = e.target.value;
			void setFieldValue(name, value);
		},
		[name, setFieldValue]
	);

	return (
		<label className={classNames(styles.select, {}, [className, styles[fieldSize]])}>
			{label && <p className={styles.select__caption}>{label}</p>}
			<div className={styles.select__wrapper}>
				<select
					className={classNames(styles.select__field, {}, [])}
					onChange={handleChange}
					name={name}
					value={selectedValue ?? undefined}
					{...otherProps}
				>
					{options.map(({ value, label }) =>
						<option key={value} value={value}>{label}</option>
					)}
				</select>
			</div>
			{name && <ErrorMessage name={name} render={msg => <CustomErrorMessage message={msg}/>} />}
		</label>
	);
});

export default CustomSelect;
