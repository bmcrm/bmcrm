import { memo, type CSSProperties } from 'react';
import DatePicker from 'react-datepicker';
import { ErrorMessage } from 'formik';
import { classNames } from '@shared/lib/classNames';
import { CustomErrorMessage } from '@shared/ui/CustomErrorMessage';
import styles from './Datepicker.module.scss';
import 'react-datepicker/dist/react-datepicker.css';
import './Datepicker.scss';

type DatepickerProps = {
	className?: string;
	errorName?: string;
	label?: string;
	placeholder?: string;
	style?: CSSProperties;
	name?: string;
	dateRange?: [Date | null | undefined, Date | null | undefined];
	onChange?: (update: [Date | null, Date | null]) => void;
	ariaLabel?: string;
};

const Datepicker = memo((props: DatepickerProps) => {
	const { className, errorName, label, placeholder = 'Select or write...', style, name, dateRange, onChange, ariaLabel } = props;
	const [startDate, endDate] = dateRange ?? [null, null];

	return (
		<label className={classNames(styles.datepicker, {}, [className])} style={style}>
			{label && <p className={styles.datepicker__caption}>{label}</p>}
			<DatePicker
				ariaDescribedBy={ariaLabel}
				name={name}
				className={styles.datepicker__field}
				selectsRange={true}
				minDate={new Date()}
				startDate={startDate}
				endDate={endDate}
				onChange={onChange}
				isClearable={true}
				placeholderText={placeholder}
				dateFormat={'dd.MM.yyyy'}
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