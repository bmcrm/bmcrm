import { type CSSProperties, type Dispatch, memo, type RefObject, type SetStateAction, useCallback } from 'react';
import { format } from 'date-fns';
import { classNames } from '@shared/lib/classNames';
import { useMedia } from '@shared/hooks/useMedia';
import { Tooltip } from '@shared/ui/Tooltip';
import { Icon, IconSize } from '@shared/ui/Icon';
import { useCalendarEvents } from '../../hooks/useCalendarEvents';
import { type ICalendarEvent, useDeleteCalendarEvent } from '@entities/Camp';
import type { CampersBirthdays } from '@entities/Camper';
import styles from './CalendarTile.module.scss';
import EditIcon from '@shared/assets/icons/edit_icon.svg';
import TrashIcon from '@shared/assets/icons/delete.svg';
import CalendarIcon from '@shared/assets/icons/calendar_icon.svg';

type CalendarTileProps = {
	date: Date;
	birthdays?: CampersBirthdays;
	customEvents?: ICalendarEvent[];
	tooltipRef: RefObject<HTMLDivElement>;
	tooltipPosition: CSSProperties | null;
	activeDay: string | null;
	setCurrentEvent:  Dispatch<SetStateAction<ICalendarEvent | null>>;
	openEditModal: () => void;
};

const CalendarTile = memo((props: CalendarTileProps) => {
	const { date, birthdays, customEvents, tooltipRef, tooltipPosition, activeDay, setCurrentEvent, openEditModal } = props;
	const { isMobile, isTablet } = useMedia();
	const { mutate: deleteEvent } = useDeleteCalendarEvent();
	const formattedDate = format(date, 'MM-dd');
	const fullDate = format(date, 'yyyy-MM-dd');

	const handleEditEvent = useCallback((event: ICalendarEvent) => {
		setCurrentEvent(event);
		openEditModal();
	}, [setCurrentEvent, openEditModal]);

	const handleDeleteEvent = useCallback((timestamp: string) => {
		deleteEvent(timestamp);
	}, [deleteEvent]);

	const calendarEvents = useCalendarEvents(birthdays, customEvents);

	const showTooltip = !!tooltipPosition && activeDay === formattedDate;

	const eventsForDate = calendarEvents
		.filter((e) => e.date === formattedDate || e.date === fullDate);

	if (eventsForDate.length === 0) return null;

	const calendarBirthdays = eventsForDate.flatMap((e) => e.birthdays ?? []);
	const calendarCustomEvents = eventsForDate.flatMap((e) => e.customEvents ?? []);

	return (
		<>
			<ul className={styles.tile__icons} aria-label={'events list'}>
				{calendarBirthdays.length > 0 && <li className={'calendar-icon'}>🎂</li>}
				{calendarCustomEvents.length > 0 && (
					<li>
						<Icon
							className={'calendar-icon'}
							icon={<CalendarIcon />}
							size={isTablet ? IconSize.SIZE_10 : IconSize.SIZE_12}
						/>
					</li>
				)}
			</ul>
			<Tooltip
				ref={tooltipRef}
				className={classNames(styles.tooltip, { [styles.show]: showTooltip }, [])}
				properties={isMobile && tooltipPosition ? tooltipPosition : {}}
			>
				{calendarBirthdays.length > 0 && (
					<p className={styles.tooltip__birthdays}>
						🎂 <span className={styles.caption}>Birthdays:</span> {calendarBirthdays.join(', ')}
					</p>
				)}
				{calendarCustomEvents.length > 0 && (
					<div className={styles.tooltip__events}>
						<p className={styles.caption}>
							<Icon style={{ color: 'var(--color-ruby-dark)' }} icon={<CalendarIcon />} size={IconSize.SIZE_12} />
							Events:
						</p>
						<ul className={styles.tooltip__eventsList}>
							{calendarCustomEvents.map((event) => (
								<li key={event.timestamp} className={styles.tooltip__eventsItem}>
									{event.event}
									<div className={styles.tooltip__eventsControl}>
										<span
											aria-label={'edit event button'}
											className={styles.tooltip__eventsBtn}
											onClick={() => handleEditEvent(event.originalEvent)}
										>
											<Icon icon={<EditIcon />} size={IconSize.SIZE_16}/>
										</span>
										<span
											aria-label={'delete event button'}
											className={styles.tooltip__eventsBtn}
											onClick={() => handleDeleteEvent(event.timestamp)}
										>
											<Icon icon={<TrashIcon />} size={IconSize.SIZE_16}/>
										</span>
									</div>
								</li>
							))}
						</ul>
					</div>
				)}
			</Tooltip>
		</>
	);
});

export { CalendarTile };