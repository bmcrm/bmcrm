import { memo, type CSSProperties, useState } from 'react';
import DatePicker from 'react-datepicker';
import { IMask, IMaskInput } from 'react-imask';
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

		onChange,

		...rest
	} = props;

	const [dateFormat, setDateFormat] = useState('dd.MM');

	const fixedMinDate = subYears(new Date(), 100);
	const fixedMaxDate = addYears(new Date(), 50);

	const today = new Date();
	const currentYear = today.getFullYear();

	// const handleDateChange = (date: Date | null) => {
	// 	if (date) {
	// 		const year = date.getFullYear();
	// 		setDateFormat(year ? 'dd.MM.yyyy' : 'dd.MM');
	// 	} else {
	// 		setDateFormat('dd.MM');
	// 	}
	// };

	// const handleDateChange = (date: Date | null) => {
	// 	if (date) {
	//
	// 		console.log('date in handler:', date)
	//
	// 		const year = date.getFullYear();
	//
	// 		if (year) {
	// 			setDateFormat('dd.MM.yyyy');
	// 		} else {
	// 			setDateFormat('dd.MM');
	// 		}
	// 	} else {
	// 		setDateFormat('dd.MM');
	// 	}
	// };

	// const handleDatepickerChange = (date: Date | null) => {
	// 	if (onChange) {
	// 		const updatedDate = date
	// 			? new Date(date.getFullYear() || currentYear, date.getMonth(), date.getDate()) // Якщо рік не введено, підставляємо поточний рік
	// 			: null;
	// 		onChange(updatedDate); // Передаємо дату з поточним роком або null
	// 	}
	// 	handleDateChange(date);
	// };

	// const handleDatepickerChange = (date: Date | null) => {
	// 	if (onChange) {
	// 		onChange(date);
	// 	}
	//
	// 	handleDateChange(date);
	// };

	const checkDateFormat = (dateStr: string) => {
		// Перевіряємо, чи містить дата рік (на основі кількості крапок)
		const dotCount = (dateStr.match(/\./g) || []).length;
		setDateFormat(dotCount === 2 ? 'dd.MM.yyyy' : 'dd.MM');
	};

	const handleDatepickerChange = (date: Date | null) => {
		if (onChange) {
			let updatedDate = date;

			if (date) {
				// Форматуємо дату у рядок для перевірки формату
				const formattedDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
				checkDateFormat(formattedDate);

				// Якщо рік не введено (наприклад, введено лише день і місяць), підставляємо поточний рік
				if (!formattedDate.includes(`${currentYear}`)) {
					updatedDate = new Date(currentYear, date.getMonth(), date.getDate());
				}
			}

			onChange(updatedDate); // Передаємо оновлену дату
		}
	};

	console.log('dateFormat:', dateFormat);

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
				// dateFormat={'dd.MM.yyyy'}
				dateFormat={dateFormat}
				isClearable={true}
				selected={date}
				showIcon
				dropdownMode={'select'}
				// minDate={minDate || fixedMinDate}
				// maxDate={maxDate || fixedMaxDate}

				onChange={handleDatepickerChange}

				// customInput={<IMaskInput
				// 	autofix={'pad'}
				// 	// mask={Date}
				// 	// min={minDate || fixedMinDate}
				// 	// max={maxDate || fixedMaxDate}
				//
				// 	// mask={Date}
				// 	// mask={'d.m[.yyyy]'}
				// 	// mask={dateFormat === 'dd.MM.yyyy' ? 'd.m.yyyy' : 'd.m'}
				// 	// mask={'d.m'}
				// 	// pattern={'d{.}`m{.}`Y'}
				//
				// 	// blocks={{
				// 	// 	d: { mask: IMask.MaskedRange, from: 1, to: 31, maxLength: 2 },
				// 	// 	m: { mask: IMask.MaskedRange, from: 1, to: 12, maxLength: 2 },
				// 	// 	yyyy: { mask: IMask.MaskedRange, from: 1900, to: 9999 },
				// 	// }}
				//
				// 	mask={'d.m[.yyyy]'} // Маска дозволяє вводити день, місяць і рік (але рік не обов'язковий)
				// 	blocks={{
				// 		d: { mask: IMask.MaskedRange, from: 1, to: 31, maxLength: 2 },
				// 		m: { mask: IMask.MaskedRange, from: 1, to: 12, maxLength: 2 },
				// 		yyyy: { mask: IMask.MaskedRange, from: 1900, to: 9999 },
				// 	}}
				// 	format={(date) => {
				// 		if (date) {
				// 			const day = String(date.getDate()).padStart(2, '0');
				// 			const month = String(date.getMonth() + 1).padStart(2, '0');
				// 			return `${day}.${month}`; // Виводимо тільки день і місяць
				// 		}
				// 		return '';
				// 	}}
				// 	parse={(str: string) => {
				// 		const parts = str.split('.').map(Number);
				// 		const day = parts[0];
				// 		const month = parts[1];
				// 		const year = parts[2] || currentYear; // Якщо рік не введено, підставляємо поточний рік
				// 		return new Date(year, month - 1, day); // Створюємо дату з поточним або введеним роком
				// 	}}
				//
				// 	// format={(date) => {
				// 	// 	// const day = String(date.getDate()).padStart(2, '0');
				// 	// 	// const month = String(date.getMonth() + 1).padStart(2, '0');
				// 	// 	// const year = date.getFullYear();
				// 	// 	// return `${day}.${month}.${year}`;
				// 	//
				// 	// 	console.log('date in format', date)
				// 	//
				// 	// 	const day = String(date.getDate()).padStart(2, '0');
				// 	// 	const month = String(date.getMonth() + 1).padStart(2, '0');
				// 	// 	return `${day}.${month}`; // Форматуємо тільки день і місяць
				// 	// }}
				// 	// parse={(str: string) => {
				// 	// 	// const parts = str.split('.').map(Number);
				// 	// 	// const day = parts[0];
				// 	// 	// const month = parts[1];
				// 	// 	// let year = parts[2];
				// 	// 	//
				// 	// 	// if (!year) {
				// 	// 	// 	year = today.getFullYear();
				// 	// 	// }
				// 	// 	//
				// 	// 	// return new Date(year, month - 1, day);
				// 	//
				// 	// 	console.log('str in parse', str)
				// 	//
				// 	// 	const parts = str.split('.').map(Number);
				// 	// 	const day = parts[0];
				// 	// 	const month = parts[1];
				// 	// 	return { day, month };
				// 	// }}
				// 	// onAccept={handleDateChange}
				// 	// onChange={(e) => {
				// 	// 	const value = e.target.value;
				// 	// 	console.log('onChange value:', value); // Лог кожної зміни в інпуті
				// 	// 	handleDateChange(value);
				// 	// }}
				//
				// 	// format={(date) => {
				// 	// 	let day = date.getDate();
				// 	// 	let month = date.getMonth() + 1;
				// 	// 	const year = date.getFullYear();
				// 	//
				// 	// 	if (day < 10) day = "0" + day;
				// 	// 	if (month < 10) month = "0" + month;
				// 	//
				// 	// 	return [year, month, day].join('.');
				// 	// }}
				//
				// 	// format={(date) => {
				// 	//
				// 	// 	console.log('date in format', date)
				// 	//
				// 	// 	const day = String(date.getDate()).padStart(2, '0');
				// 	// 	const month = String(date.getMonth() + 1).padStart(2, '0');
				// 	// 	const year = date.getFullYear();
				// 	// 	return `${day}.${month}.${year}`;
				// 	// }}
				//
				// 	// parse={(str: string) => {
				// 	// 	console.log('str in parse:', str)
				// 	// 	const parts = str.split('.').map(Number);
				// 	// 	const day = parts[0];
				// 	// 	const month = parts[1];
				// 	// 	const year = today.getFullYear();
				// 	//
				// 	// 	const date = new Date(year, month - 1, day);
				// 	//
				// 	// 	console.log('Parsed date:', date);
				// 	//
				// 	// 	return date;
				// 	// }}
				// />}
				{...rest}
			/>
			{errorName && (
				<ErrorMessage name={errorName} render={(msg) => <CustomErrorMessage message={msg} />} />
			)}
		</label>
	);
});

export { Datepicker };