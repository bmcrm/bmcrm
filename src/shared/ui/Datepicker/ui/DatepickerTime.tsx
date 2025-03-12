import { memo, type CSSProperties } from 'react';
import DatePicker from 'react-datepicker';
import { IMaskInput } from 'react-imask';
import { ErrorMessage } from 'formik';
import { classNames } from '@shared/lib/classNames';
import { CustomErrorMessage } from '@shared/ui/CustomErrorMessage';
import styles from './Datepicker.module.scss';
import 'react-datepicker/dist/react-datepicker.css';
import './Datepicker.scss';

type DatepickerTimeProps = {
	className?: string;
	label?: string;
	placeholder?: string;
	title?: string;
	style?: CSSProperties;
	name?: string;
	time?: Date | null;
	timeIntervals?: number;
	onChange?: (date: Date | null) => void;
};

const DatepickerTime = memo((props: DatepickerTimeProps) => {
	const { className, label, placeholder = '00:00', title = 'Time', style, name, time, timeIntervals = 15, onChange } = props;

	return (
		<label className={classNames(styles.datepicker, {}, [className])} style={style}>
			{label && <p className={styles.datepicker__caption}>{label}</p>}
			<DatePicker
				name={name}
				placeholderText={placeholder}
				className={styles.datepicker__field}
				selected={time}
				onChange={onChange}
				timeIntervals={timeIntervals}
				timeCaption={title}
				dateFormat={'HH:mm'}
				timeFormat={'HH:mm'}
				showTimeSelect
				showTimeSelectOnly
				customInput={<IMaskInput mask={'00:00'} />}
			/>
			{name && (
				<ErrorMessage
					name={name}
					render={() => <CustomErrorMessage className={styles.datepicker__error} />}
				/>
			)}
		</label>
	);
});

export { DatepickerTime };