import { memo, type CSSProperties } from 'react';
import DatePicker from 'react-datepicker';
import { ErrorMessage } from 'formik';
import { classNames } from '@shared/lib/classNames';
import { CustomErrorMessage } from '@shared/ui/CustomErrorMessage';
import styles from './Datepicker.module.scss';
import 'react-datepicker/dist/react-datepicker.css';
import './Datepicker.scss';

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
}

const DatepickerRange = memo((props: DatepickerRangeProps) => {
	const { className, errorName, label, placeholder = 'Select or write...', style, dateRange, ...rest } = props;
	const [startDate, endDate] = dateRange ?? [null, null];

	return (
		<label className={classNames(styles.datepicker, {}, [className])} style={style}>
			{label && <p className={styles.datepicker__caption}>{label}</p>}
			<DatePicker
				className={styles.datepicker__field}
				selectsRange={true}
				startDate={startDate}
				endDate={endDate}
				isClearable={true}
				placeholderText={placeholder}
				dateFormat={'dd.MM.yyyy'}
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

export { DatepickerRange };