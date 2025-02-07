import { memo } from 'react';
import { classNames } from '@shared/lib/classNames';
import { Modal } from '@shared/ui/Modal';
import { AddShiftForm } from '@entities/Shift';
import styles from './AddShiftModal.module.scss';

type AddShiftModalProps = {
	className?: string;
	isOpen: boolean;
	onClose: () => void;
};

const AddShiftModal = memo((props: AddShiftModalProps) => {
	const { className, isOpen, onClose } = props;

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<div className={classNames(styles.modal, {}, [className])}>
				<AddShiftForm />
			</div>
		</Modal>
	);
});

export default AddShiftModal;