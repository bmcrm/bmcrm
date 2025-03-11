import { memo } from 'react';
import { Modal } from '@shared/ui/Modal';
import { CalendarEventForm, type ICalendarEvent } from '@entities/Camp';

type CalendarEventModalProps = {
	isOpen: boolean;
	onClose: () => void;
	currentEvent?: ICalendarEvent | null;
};

const CalendarEventModal = memo(({ isOpen, onClose, currentEvent }: CalendarEventModalProps) => (
	<Modal isOpen={isOpen} onClose={onClose} isOverflow>
		<CalendarEventForm onClose={onClose} currentEvent={currentEvent} />
	</Modal>
));

export default CalendarEventModal;