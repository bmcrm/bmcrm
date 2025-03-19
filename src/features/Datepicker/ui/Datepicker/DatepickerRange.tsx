import { memo, type CSSProperties } from 'react';
import DatePicker from 'react-datepicker';
import { IMask, IMaskInput } from 'react-imask';
import { ErrorMessage } from 'formik';
import { addYears, subYears } from 'date-fns';
import {  enUS } from 'date-fns/locale';
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
	const minYear = (minDate || fixedMinDate).getFullYear();
	const maxYear = (maxDate || fixedMaxDate).getFullYear();

	return (
		<label className={classNames(styles.datepicker, {}, [className])} style={style}>
			{label && <p className={styles.datepicker__caption}>{label}</p>}
			<DatePicker
				className={styles.datepicker__field}
				calendarClassName={styles.datepicker__calendar}
				calendarIconClassName={styles.datepicker__calendarIcon}
				popperPlacement={'top'}
				locale={enUS}
				showIcon
				selectsRange={true}
				startDate={startDate}
				endDate={endDate}
				isClearable={true}
				placeholderText={placeholder}
				dateFormat={'MM/dd/yyyy'}
				dropdownMode={'select'}
				minDate={minDate || fixedMinDate}
				maxDate={fixedMaxDate}
				customInput={<IMaskInput
					mask={'from - to'}
					blocks={{
						'from': {
							mask: Date,
							pattern: '`m{/}`d{/}`y',
							autofix: 'pad',
							blocks: {
								m: { mask: IMask.MaskedRange, from: 1, to: 12, maxLength: 2 },
								d: { mask: IMask.MaskedRange, from: 1, to: 31, maxLength: 2 },
								y: { mask: IMask.MaskedRange, from: minYear, to: maxYear },
							},
							format: (date: Date | null) => {
								if (!date) return '';

								const month = String(date.getMonth() + 1).padStart(2, '0');
								const day = String(date.getDate()).padStart(2, '0');
								const year = String(date.getFullYear());

								return `${month}/${day}/${year}`;
							},
							parse: (str: string) => {
								const parts = str.split('/').map(Number);
								const month = parts[0];
								const day = parts[1];
								const year = parts[2];

								if (!day || !month || !year) return null;

								return new Date(year, month - 1, day);
							},
						},
						'to': {
							mask: Date,
							pattern: '`m{/}`d{/}`y',
							autofix: 'pad',
							blocks: {
								m: { mask: IMask.MaskedRange, from: 1, to: 12, maxLength: 2 },
								d: { mask: IMask.MaskedRange, from: 1, to: 31, maxLength: 2 },
								y: { mask: IMask.MaskedRange, from: minYear, to: maxYear },
							},
							format: (date: Date | null) => {
								if (!date) return '';

								const month = String(date.getMonth() + 1).padStart(2, '0');
								const day = String(date.getDate()).padStart(2, '0');
								const year = String(date.getFullYear());

								return `${month}/${day}/${year}`;
							},
							parse: (str: string) => {
								const parts = str.split('/').map(Number);
								const month = parts[0];
								const day = parts[1];
								const year = parts[2];

								if (!day || !month || !year) return null;

								return new Date(year, month - 1, day);
							},
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