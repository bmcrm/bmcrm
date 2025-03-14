import {
	memo,
	useCallback,
	useEffect,
	useRef,
	useState,
	type CSSProperties,
	type MouseEvent as ReactMouseEvent,
} from 'react';
import Calendar from 'react-calendar';
import { addYears, format, subYears } from 'date-fns';
import { classNames } from '@shared/lib/classNames';
import { useMedia } from '@shared/hooks/useMedia';
import { useToggle } from '@shared/hooks/useToggle';
import { FormLoader } from '@features/FormLoader';
import { CalendarEventModal } from '@features/CalendarEventModal';
import { CalendarTile } from '../CalendarTile/CalendarTile';
import { useGetBirthdays } from '@entities/Camper';
import { useGetCalendarEvents, type ICalendarEvent } from '@entities/Camp';
import 'react-calendar/dist/Calendar.css';
import './Calendar.scss';
import styles from './Calendar.module.scss';
import tileStyles from '../CalendarTile/CalendarTile.module.scss';

type CalendarProps = {
	className?: string;
};

const CustomCalendar = memo(({ className }: CalendarProps) => {
	const { isMobile } = useMedia();
	const { data: birthdays, isLoading: isBirthdaysLoading } = useGetBirthdays();
	const { data: customEvents, isLoading: isCustomEventsLoading } = useGetCalendarEvents();
	const [activeDay, setActiveDay] = useState<string | null>(null);
	const [tooltipPosition, setTooltipPosition] = useState<CSSProperties | null>(null);
	const [currentEvent, setCurrentEvent] = useState<ICalendarEvent | null>(null);
	const tooltipRef = useRef<HTMLDivElement>(null);
	const { isOpen, open, close } = useToggle();
	const isLoading = isBirthdaysLoading || isCustomEventsLoading;
	const minDate = subYears(new Date(), 50);
	const maxDate = addYears(new Date(), 50);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (!activeDay) return;

			const target = event.target as Node;

			if (tooltipRef.current && !tooltipRef.current.contains(target)) {
				setTimeout(() => {
					setTooltipPosition(null);
					setActiveDay(null);
				}, 0)
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [activeDay]);

	const handleClickDay = useCallback(
		(date: Date, event: ReactMouseEvent<HTMLButtonElement>) => {
			if ((!birthdays && !customEvents) || !isMobile) return;

			const formattedDayMonth = format(date, 'MM-dd');
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
		[birthdays, isMobile, activeDay, customEvents]
	);

	return (
		<>
			<div className={classNames(styles.calendar, {}, [className])}>
				{isLoading && <FormLoader />}
				<Calendar
					className={styles.calendar__item}
					minDate={minDate}
					maxDate={maxDate}
					tileClassName={tileStyles.tile}
					onClickDay={handleClickDay}
					tileContent={({ date }) => (
						<CalendarTile
							date={date}
							birthdays={birthdays}
							customEvents={customEvents}
							setCurrentEvent={setCurrentEvent}
							tooltipRef={tooltipRef}
							activeDay={activeDay}
							tooltipPosition={tooltipPosition}
							openEditModal={open}
						/>
					)}
				/>
			</div>
			<CalendarEventModal isOpen={isOpen} onClose={close} currentEvent={currentEvent} />
		</>
	);
});

export default CustomCalendar;