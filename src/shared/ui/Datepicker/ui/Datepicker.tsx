import { memo, type CSSProperties } from 'react';
import DatePicker from 'react-datepicker';
import { classNames } from '@shared/lib/classNames';
import styles from './Datepicker.module.scss';
import 'react-datepicker/dist/react-datepicker.css';
import './Datepicker.scss';

type DatepickerProps = {
	className?: string;
	label?: string;
	placeholder?: string;
	style?: CSSProperties;
	name?: string;
	dateRange?: [Date | null | undefined, Date | null | undefined];
	onChange?: (update: [Date | null, Date | null]) => void
};

const Datepicker = memo((props: DatepickerProps) => {
	const { className, label, placeholder = 'Select or write...', style, name, dateRange, onChange } = props;
	const [startDate, endDate] = dateRange ?? [null, null];

	return (
		<label className={classNames(styles.datepicker, {}, [className])} style={style}>
			{label && <p className={styles.datepicker__caption}>{label}</p>}
			<DatePicker
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
		</label>
	);
});

export { Datepicker };