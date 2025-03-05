import {
	memo,
	useCallback,
	useEffect,
	useState,
	useRef,
	type MouseEvent as ReactMouseEvent,
	type CSSProperties,
} from 'react';
import Calendar from 'react-calendar';
import { parseISO } from 'date-fns';
import { classNames } from '@shared/lib/classNames';
import { useMedia } from '@shared/hooks/useMedia';
import { Tooltip } from '@shared/ui/Tooltip';
import { FormLoader } from '@features/FormLoader';
import { useGetBirthdays } from '@entities/Camper';
import 'react-calendar/dist/Calendar.css';
import './Calendar.scss';
import styles from './Calendar.module.scss';

type CalendarProps = {
	className?: string;
};

const CustomCalendar = memo(({ className }: CalendarProps) => {
	const { isMobile } = useMedia();
	const { data: birthdays, isLoading: isBirthdaysLoading } = useGetBirthdays();
	const [activeDay, setActiveDay] = useState<string | null>(null);
	const [tooltipPosition, setTooltipPosition] = useState<CSSProperties | null>(null);
	const tooltipRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (!activeDay) return;

			const target = event.target as Node;

			if (tooltipRef.current && !tooltipRef.current.contains(target)) {
				setTooltipPosition(null);
				setActiveDay(null);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [activeDay]);

	const handleClickDay = useCallback(
		(date: Date, event: ReactMouseEvent<HTMLButtonElement>) => {
			if (!birthdays || !isMobile) return;

			const formattedDayMonth = `${date.getMonth()}-${date.getDate()}`;
			const isClickOnTooltip = (event.target as Element).closest(`.${styles.tooltip}`) !== null;
			const clientX = event.clientX;
			const screenWidth = window.innerWidth;
			const distanceToRightEdge = screenWidth - clientX;
			const isNearRightEdge = distanceToRightEdge < 150;

			if (isClickOnTooltip) {
				return;
			}

			if (activeDay === formattedDayMonth) {
				setActiveDay(null);
				setTooltipPosition(null);
			} else {
				setActiveDay(formattedDayMonth);
				setTooltipPosition({
					left: isNearRightEdge ? 'auto' : '10px',
					right: isNearRightEdge ? '10px' : 'auto',
				});
			}
		},
		[birthdays, isMobile, activeDay]
	);

	return (
		<div className={classNames(styles.calendar, {}, [className])}>
			{isBirthdaysLoading && <FormLoader />}
			<Calendar
				className={styles.calendar__item}
				tileClassName={styles.calendar__tile}
				onClickDay={handleClickDay}
				tileContent={({ date }) => {
					if (!birthdays) return null;

					const formattedDayMonth = `${date.getMonth()}-${date.getDate()}`;
					const showTooltip = !!tooltipPosition && activeDay === formattedDayMonth;

					const birthdayPeople = Object.entries(birthdays)
						.filter(([isoDate]) => {
							const birthday = parseISO(isoDate);

							return (
								birthday.getMonth() === date.getMonth() &&
								birthday.getDate() === date.getDate()
							);
						})
						.flatMap(([, names]) => names);

					if (birthdayPeople.length === 0) return null;

					return (
						<>
							<span className={styles.calendar__icon}>🎂</span>
							<Tooltip
								ref={tooltipRef}
								className={classNames(styles.tooltip, { [styles.show]: showTooltip }, [])}
								properties={tooltipPosition || {}}
							>
								<p>Birthday: {birthdayPeople.join(', ')}</p>
							</Tooltip>
						</>
					);
				}}
			/>
		</div>
	);
});

export default CustomCalendar;