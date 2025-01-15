import { memo } from 'react';
import { Modal } from '@shared/ui/Modal';
import { Image } from '@shared/ui/Image';
import { Button } from '@shared/ui/Button';
import styles from './InventoryConfirmDeleteModal.module.scss';
import DeleteImg from '@shared/assets/images/inventory/confirm-delete.png';

type InventoryConfirmDeleteModalProps = {
	isOpen: boolean;
	onClose: () => void;
	itemTitle: string;
	handleDelete: () => void;
};

const InventoryConfirmDeleteModal = memo((props: InventoryConfirmDeleteModalProps) => {
	const { isOpen, onClose, itemTitle, handleDelete } = props;

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<div className={styles.modal}>
				<Image src={DeleteImg} maxWidth={80} />
				<h3>Are you sure you want to delete the item "{itemTitle}"?</h3>
				<Button onClick={handleDelete} fluid>
					YES, DELETE
				</Button>
			</div>
		</Modal>
	);
});

export default InventoryConfirmDeleteModal;