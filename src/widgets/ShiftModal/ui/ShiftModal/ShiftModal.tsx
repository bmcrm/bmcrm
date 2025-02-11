import { memo } from 'react';
import { classNames } from '@shared/lib/classNames';
import { Modal } from '@shared/ui/Modal';
import { ShiftForm, ShiftFormTheme, type IShift } from '@entities/Shift';
import styles from './ShiftModal.module.scss';

type ShiftModalProps = {
	className?: string;
	isOpen: boolean;
	onClose: () => void;
	theme?: ShiftFormTheme;
	currentShift?: IShift | null;
};

const ShiftModal = memo((props: ShiftModalProps) => {
	const { className, isOpen, onClose, theme, currentShift } = props;

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<div className={classNames(styles.modal, {}, [className])}>
				<ShiftForm onClose={onClose} theme={theme} currentShift={currentShift} />
			</div>
		</Modal>
	);
});

export default ShiftModal;