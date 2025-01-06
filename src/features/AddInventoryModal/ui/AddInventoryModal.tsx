import { memo } from 'react';
import { Modal } from '@shared/ui/Modal';
import { AddInventoryForm } from '@entities/Inventory';

type AddInventoryModalProps = {
	isOpen: boolean;
	onClose: () => void;
};

const AddInventoryModal = memo(({ isOpen, onClose }: AddInventoryModalProps) => (
	<Modal isOpen={isOpen} onClose={onClose}>
		<AddInventoryForm onClose={onClose} />
	</Modal>
));

export default AddInventoryModal;
