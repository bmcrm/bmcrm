import { memo } from 'react';
import { classNames } from '@shared/lib/classNames';
import { useToggle } from '@shared/hooks/useToggle';
import { Button } from '@shared/ui/Button';
import { Calendar } from '@widgets/Calendar';
import { CalendarEventModal } from '@features/CalendarEventModal';
import styles from './DashboardCalendar.module.scss';

type DashboardCalendarProps = {
	className?: string;
};

const DashboardCalendar = memo(({ className }: DashboardCalendarProps) => {
	const { isOpen, open, close } = useToggle();

	return (
		<>
			<div className={classNames(styles.calendar, {}, [className])}>
				<Calendar />
				<Button className={'mt-10'} onClick={open} fluid>Add event</Button>
			</div>
			<CalendarEventModal isOpen={isOpen} onClose={close} />
		</>
	);
});

export { DashboardCalendar };