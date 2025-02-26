import { memo } from 'react';
import { Modal } from '@shared/ui/Modal';
import { CreateCamperForm } from '@entities/Camper';

type CreateCamperModalProps = {
	isOpen: boolean;
	onClose: () => void;
};

const CreateCamperModal = memo(({ isOpen, onClose }: CreateCamperModalProps) => (
	<Modal isOpen={isOpen} onClose={onClose}>
		<CreateCamperForm onClose={onClose} />
	</Modal>
));

export default CreateCamperModal;