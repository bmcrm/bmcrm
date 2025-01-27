import { memo, useCallback, useMemo } from 'react';
import CreatableSelect from 'react-select/creatable';
import type { MultiValue, Props as SelectProps } from 'react-select';
import { classNames } from '@shared/lib/classNames';
import styles from './TagsSelect.module.scss';

interface Option {
	value: string;
	label: string;
}

interface TagsSelectProps extends Omit<SelectProps<Option, true>, 'onChange' | 'value'> {
	className?: string;
	label?: string;
	value?: string[];
	onChange?: (values: string[]) => void;
	options: Option[];
}

const TagsSelect = memo((props: TagsSelectProps) => {
	const { className, label, value = [], onChange, options, ...rest } = props;

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
			<CreatableSelect
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
					}),
				}}
				{...rest}
			/>
		</label>
	);
});

export default TagsSelect;