import { memo, type CSSProperties } from 'react';
import DatePicker from 'react-datepicker';
import { IMaskInput } from 'react-imask';
import { ErrorMessage } from 'formik';
import { classNames } from '@shared/lib/classNames';
import { CustomErrorMessage } from '@shared/ui/CustomErrorMessage';
import styles from './Datepicker.module.scss';
import 'react-datepicker/dist/react-datepicker.css';
import './Datepicker.scss';

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
	showMonthDropdown?: boolean;
	showYearDropdown?: boolean;
	mask?: string;
}

const Datepicker = memo((props: DatepickerProps) => {
	const { className, errorName, label, placeholder = 'Select or write...', style, date, mask, ...rest } = props;

	return (
		<label className={classNames(styles.datepicker, {}, [className])} style={style}>
			{label && <p className={styles.datepicker__caption}>{label}</p>}
			<DatePicker
				className={styles.datepicker__field}
				placeholderText={placeholder}
				dateFormat={'dd.MM.yyyy'}
				isClearable={true}
				selected={date}
				showIcon
				dropdownMode={'select'}
				calendarIconClassName={styles.datepicker__calendarIcon}
				customInput={<IMaskInput mask={mask} />}
				{...rest}
			/>
			{errorName && (
				<ErrorMessage
					name={errorName}
					render={(msg) => <CustomErrorMessage message={msg} />}
				/>
			)}
		</label>
	);
});

export { Datepicker };