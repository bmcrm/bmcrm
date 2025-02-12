import { memo, useCallback, useMemo } from 'react';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import type { MultiValue, Props as SelectProps } from 'react-select';
import { ErrorMessage } from 'formik';
import { classNames } from '@shared/lib/classNames';
import { CustomErrorMessage } from '@shared/ui/CustomErrorMessage';
import styles from './MultiSelect.module.scss';

interface Option {
	value: string;
	label: string;
}

interface MultiSelectProps extends Omit<SelectProps<Option, true>, 'onChange' | 'value'> {
	className?: string;
	isCreatable?: boolean;
	label?: string;
	value?: string[];
	onChange?: (values: string[]) => void;
	options: Option[];
}

const MultiSelect = memo((props: MultiSelectProps) => {
	const { className, label, value = [], onChange, options, isCreatable, ...rest } = props;
	const CurrentSelect = isCreatable ? CreatableSelect : Select;

	const formattedValue = useMemo(
		() => value.map((val) => ({
			value: val,
			label: options.find((opt) => opt.value === val)?.label || val,
		})),
		[value, options]
	);

	const handleChange = useCallback(
		(selectedOptions: MultiValue<Option>) => {
			const newValues = selectedOptions.map((option) => option.value);
			onChange?.(newValues);
		},
		[onChange]
	);

	return (
		<label className={classNames(styles.select, {}, [className])}>
			{label && <p className={styles.select__caption}>{label}</p>}
			<CurrentSelect
				isMulti
				value={formattedValue}
				options={options}
				onChange={handleChange}
				styles={{
					control: (baseStyles, state) => ({
						...baseStyles,
						minHeight: 46,
						borderWidth: 2,
						borderRadius: 10,
						borderColor: state.isFocused ? 'var(--color-ruby-dark)' : 'var(--color-input-orange)',
						boxShadow: 'none',
						backgroundColor: 'transparent',
						'&:hover': {
							borderColor: state.isFocused ? 'var(--color-ruby-dark)' : 'var(--color-input-orange)',
							boxShadow: 'none',
						},
					}),
					option: (baseStyles, state) => ({
						...baseStyles,
						font: 'var(--font-s)',
						backgroundColor: state.isSelected ? 'rgba(139, 16, 62, .2)' : '',
						'&:hover': {
							backgroundColor: 'rgba(139, 16, 62, .3)',
						},
					}),
					placeholder: (baseStyles) => ({
						...baseStyles,
						font: 'var(--font-s)',
						color: 'var(--color-neutral)',
					}),
				}}
				{...rest}
			/>
			{rest.name && (
				<ErrorMessage
					name={rest.name}
					render={(msg) => <CustomErrorMessage message={msg} />}
				/>
			)}
		</label>
	);
});

export default MultiSelect;