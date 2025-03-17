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

interface DatepickerRangeProps {
	className?: string;
	errorName?: string;
	label?: string;
	placeholder?: string;
	style?: CSSProperties;
	name?: string;
	dateRange?: [Date | null | undefined, Date | null | undefined];
	onChange?: (update: [Date | null, Date | null]) => void;
	ariaDescribedBy?: string;
	minDate?: Date;
	maxDate?: Date;
	showMonthDropdown?: boolean;
	showYearDropdown?: boolean;
}

const DatepickerRange = memo((props: DatepickerRangeProps) => {
	const {
		className,
		errorName,
		label,
		placeholder = 'Select or write...',
		style,
		dateRange,
		minDate,
		maxDate,
		...rest
	} = props;
	const [startDate, endDate] = dateRange ?? [null, null];

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
				showIcon
				selectsRange={true}
				startDate={startDate}
				endDate={endDate}
				isClearable={true}
				placeholderText={placeholder}
				dateFormat={'dd.MM.yyyy'}
				dropdownMode={'select'}
				minDate={minDate || fixedMinDate}
				maxDate={fixedMaxDate}
				customInput={<IMaskInput
					mask={'from - to'}
					blocks={{
						'from': {
							mask: Date,
							min: minDate || fixedMinDate,
							max: fixedMaxDate,
							autofix: 'pad',
						},
						'to': {
							mask: Date,
							min: minDate || fixedMinDate,
							max: fixedMaxDate,
							autofix: 'pad',
						},
					}}
				/>}
				{...rest}
			/>
			{errorName && (
				<ErrorMessage
					name={errorName}
					render={(msg) => <CustomErrorMessage message={msg}/>}
				/>
			)}
		</label>
	);
});

export { DatepickerRange };