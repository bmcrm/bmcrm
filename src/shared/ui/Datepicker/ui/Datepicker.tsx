import { memo, type CSSProperties } from 'react';
import DatePicker from 'react-datepicker';
import { IMaskInput } from 'react-imask';
import { ErrorMessage } from 'formik';
import { addYears, subYears } from 'date-fns';
import { enGB } from 'date-fns/locale/en-GB';
import { classNames } from '@shared/lib/classNames';
import { CustomErrorMessage } from '@shared/ui/CustomErrorMessage';
import 'react-datepicker/dist/react-datepicker.css';
import './Datepicker.scss';
import styles from './Datepicker.module.scss';

interface DatepickerProps {
	className?: string;
	errorName?: string;
	label?: string;
	placeholder?: string;
	style?: CSSProperties;
	date?: Date | null;
	onChange?: (date: Date | null) => void;
	name?: string;
	ariaDescribedBy?: string;
	minDate?: Date;
	maxDate?: Date;
	showMonthDropdown?: boolean;
	showYearDropdown?: boolean;
	mask?: string;
}

const Datepicker = memo((props: DatepickerProps) => {
	const {
		className,
		errorName,
		label,
		placeholder = 'Select or write...',
		style,
		date,
		mask,
		minDate,
		maxDate,
		...rest
	} = props;

	const fixedMinDate = subYears(new Date(), 100);
	const fixedMaxDate = addYears(new Date(), 50);

	return (
		<label className={classNames(styles.datepicker, {}, [className])} style={style}>
			{label && <p className={styles.datepicker__caption}>{label}</p>}
			<DatePicker
				className={styles.datepicker__field}
				calendarClassName={styles.datepicker__calendar}
				calendarIconClassName={styles.datepicker__calendarIcon}
				popperPlacement={'top'}
				locale={enGB}
				placeholderText={placeholder}
				dateFormat={'dd.MM.yyyy'}
				isClearable={true}
				selected={date}
				showIcon
				dropdownMode={'select'}
				minDate={minDate || fixedMinDate}
				maxDate={maxDate || fixedMaxDate}
				customInput={<IMaskInput
					mask={Date}
					autofix={'pad'}
					min={minDate || fixedMinDate}
					max={maxDate || fixedMaxDate}
				/>}
				{...rest}
			/>
			{errorName && (
				<ErrorMessage name={errorName} render={(msg) => <CustomErrorMessage message={msg} />} />
			)}
		</label>
	);
});

export { Datepicker };