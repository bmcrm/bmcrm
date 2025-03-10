import { memo } from 'react';
import { Modal } from '@shared/ui/Modal';
import { AddCalendarEventForm } from '@entities/Camp';

type AddCalendarEventModalProps = {
	isOpen: boolean;
	onClose: () => void;
};

const AddCalendarEventModal = memo(({ isOpen, onClose }: AddCalendarEventModalProps) => (
	<Modal isOpen={isOpen} onClose={onClose} isOverflow>
		<AddCalendarEventForm onClose={onClose} />
	</Modal>
));

export default AddCalendarEventModal;