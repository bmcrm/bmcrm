import { memo, type CSSProperties } from 'react';
import DatePicker from 'react-datepicker';
import { IMask, IMaskInput } from 'react-imask';
import { ErrorMessage } from 'formik';
import { enUS } from 'date-fns/locale';
import { classNames } from '@shared/lib/classNames';
import { CustomErrorMessage } from '@shared/ui/CustomErrorMessage';
import { DatepickerHeader } from '../DatepickerHeader/DatepickerHeader.tsx';
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
}

const Datepicker = memo((props: DatepickerProps) => {
	const {
		className,
		errorName,
		label,
		placeholder = 'Select or write...',
		style,
		date,
		minDate,
		maxDate,
		...rest
	} = props;

	return (
		<label className={classNames(styles.datepicker, {}, [className])} style={style}>
			{label && <p className={styles.datepicker__caption}>{label}</p>}
			<DatePicker
				className={styles.datepicker__field}
				calendarClassName={styles.datepicker__calendar}
				calendarIconClassName={styles.datepicker__calendarIcon}
				popperPlacement={'top'}
				locale={enUS}
				placeholderText={placeholder}
				dateFormat={'MM/dd'}
				isClearable={true}
				selected={date}
				showIcon
				dropdownMode={'select'}
				renderCustomHeader={(props) => <DatepickerHeader {...props} />}
				customInput={<IMaskInput
					autofix={'pad'}
					mask={Date}
					pattern={'`m{/}`d'}
					blocks={{
						d: { mask: IMask.MaskedRange, from: 1, to: 31, maxLength: 2 },
						m: { mask: IMask.MaskedRange, from: 1, to: 12, maxLength: 2 },
					}}
					format={(date: Date | null) => {
						if (!date) return '';

						const month = String(date.getMonth() + 1).padStart(2, '0');
						const day = String(date.getDate()).padStart(2, '0');

						return `${month}/${day}`;
					}}
					parse={(str: string) => {
						const parts = str.split('/').map(Number);
						const month = parts[0];
						const day = parts[1];

						if (!day || !month) return null;

						return new Date(new Date().getFullYear(), month - 1, day);
					}}
				/>}
				{...rest}
			/>
			{errorName && (
				<ErrorMessage name={errorName} render={(msg) => <CustomErrorMessage message={msg}/>}/>
			)}
		</label>
	);
});

export { Datepicker };