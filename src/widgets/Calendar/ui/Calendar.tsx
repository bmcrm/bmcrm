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
import { format } from 'date-fns';
import { classNames } from '@shared/lib/classNames';
import { useMedia } from '@shared/hooks/useMedia';
import { Tooltip } from '@shared/ui/Tooltip';
import { FormLoader } from '@features/FormLoader';
import { Button, ButtonSize, ButtonTheme } from '@shared/ui/Button';
import { Icon, IconSize } from '@shared/ui/Icon';
import { useGetBirthdays } from '@entities/Camper';
import { useDeleteCalendarEvent, useGetCalendarEvents } from '@entities/Camp';
import { useCalendarEvents } from '../hooks/useCalendarEvents';
import 'react-calendar/dist/Calendar.css';
import './Calendar.scss';
import styles from './Calendar.module.scss';
import EditIcon from '@shared/assets/icons/edit_icon.svg';
import TrashIcon from '@shared/assets/icons/delete.svg';

type CalendarProps = {
	className?: string;
};

const CustomCalendar = memo(({ className }: CalendarProps) => {
	const { isMobile } = useMedia();
	const { data: birthdays, isLoading: isBirthdaysLoading } = useGetBirthdays();
	const { data: customEvents, isLoading: isCustomEventsLoading } = useGetCalendarEvents();
	const { mutate: deleteEvent } = useDeleteCalendarEvent();
	const [activeDay, setActiveDay] = useState<string | null>(null);
	const [tooltipPosition, setTooltipPosition] = useState<CSSProperties | null>(null);
	const tooltipRef = useRef<HTMLDivElement>(null);
	const isLoading = isBirthdaysLoading || isCustomEventsLoading;

	const calendarEvents = useCalendarEvents(birthdays, customEvents);

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

			const formattedDayMonth = format(date, "MM-dd");
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

	const handleDeleteEvent = useCallback((timestamp: string) => {
		deleteEvent(timestamp);
	}, [deleteEvent]);

	return (
		<div className={classNames(styles.calendar, {}, [className])}>
			{isLoading && <FormLoader />}
			<Calendar
				className={styles.calendar__item}
				tileClassName={styles.calendar__tile}
				onClickDay={handleClickDay}
				tileContent={({ date }) => {
					const formattedDate = format(date, 'MM-dd');
					const fullDate = format(date, 'yyyy-MM-dd');

					const showTooltip = !!tooltipPosition && activeDay === formattedDate;

					const eventsForDate = calendarEvents
						.filter((e) => e.date === formattedDate || e.date === fullDate);

					if (eventsForDate.length === 0) return null;

					const birthdays = eventsForDate.flatMap((e) => e.birthdays ?? []);
					const customEvents = eventsForDate.flatMap((e) => e.customEvents ?? []);

					return (
						<>
							<ul className={styles.calendar__icons}>
								{birthdays.length > 0 && <li>🎂</li>}
								{customEvents.length > 0 && <li>📅</li>}
							</ul>
							<Tooltip
								ref={tooltipRef}
								className={classNames(styles.tooltip, { [styles.show]: showTooltip }, [])}
								properties={isMobile && tooltipPosition ? tooltipPosition : {}}
							>
								{birthdays.length > 0 && (
									<p className={styles.tooltip__birthdays}>
										🎂 <span className={styles.caption}>Birthdays:</span> {birthdays.join(', ')}
									</p>
								)}
								{customEvents.length > 0 && (
									<div className={styles.tooltip__events}>
										<p className={styles.caption}>📅 Events:</p>
										<ul className={styles.tooltip__eventsList}>
											{customEvents.map(({ timestamp, title }) => (
												<li key={timestamp} className={styles.tooltip__eventsItem}>
													{title}
													<div className={styles.tooltip__eventsControl}>
														<Button
															theme={ButtonTheme.CLEAR}
															size={ButtonSize.TEXT}
															className={styles.tooltip__eventsBtn}
														>
															<Icon icon={<EditIcon />} size={IconSize.SIZE_16} />
														</Button>
														<Button
															theme={ButtonTheme.CLEAR}
															size={ButtonSize.TEXT}
															className={styles.tooltip__eventsBtn}
															onClick={() => handleDeleteEvent(timestamp)}
														>
															<Icon icon={<TrashIcon />} size={IconSize.SIZE_16} />
														</Button>
													</div>
												</li>
											))}
										</ul>
									</div>
								)}
							</Tooltip>
						</>
					);
				}}
			/>
		</div>
	);
});

export default CustomCalendar;