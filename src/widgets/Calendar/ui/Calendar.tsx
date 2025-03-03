import { memo } from 'react';
import Calendar from 'react-calendar';
import { classNames } from '@shared/lib/classNames';
import { Tooltip } from '@shared/ui/Tooltip';
import type { IBirthdays } from '@entities/Dashboard';
import 'react-calendar/dist/Calendar.css';
import './Calendar.scss';
import styles from './Calendar.module.scss';

type CalendarProps = {
	className?: string;
	birthdays?: IBirthdays;
};

const CustomCalendar = memo((props: CalendarProps) => {
	const { className, birthdays } = props;

	return (
		<Calendar
			className={classNames(styles.calendar, {}, [className])}
			tileClassName={`${styles.calendar__tile}`}
			tileContent={({ date }) => {
				const formattedDate = `${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

				if (!birthdays) return null;

				const birthdayPeople = Object.entries(birthdays)
					.filter(([birthdayDate]) => {
						const [_, month, day] = birthdayDate.split('-');
						return `${month}-${day}` === formattedDate;
					})
					.map(([_, names]) => names)
					.flat();

				if (birthdayPeople.length === 0) return null;

				return (
					<>
						<span className={styles.calendar__icon}>🎂</span>
						<Tooltip className={styles.tooltip}>
							<p>Birthday: {birthdayPeople.join(', ')}</p>
						</Tooltip>
					</>
				);
			}}
		/>
	);
});

export default CustomCalendar;