import { memo, useCallback, type CSSProperties, type ReactNode } from 'react';
import { classNames } from '@shared/lib/classNames';
import { Modal } from '@shared/ui/Modal';
import { Image } from '@shared/ui/Image';
import { Button, ButtonSize, ButtonTheme } from '@shared/ui/Button';
import styles from './ConfirmModalTemplate.module.scss';

type ConfirmModalTemplateProps = {
	className?: string;
	isOpen: boolean;
	onClose: () => void;
	imgSrc?: string;
	imgMaxWidth?: CSSProperties['maxWidth'];
	title?: string | ReactNode;
	btnLabel?: string;
	handler: () => void;
};

const ConfirmModalTemplate = memo((props: ConfirmModalTemplateProps) => {
	const { className, isOpen, onClose, handler, imgSrc, imgMaxWidth = 80, title, btnLabel = 'Yes' } = props;

	const handleConfirm = useCallback(() => {
		onClose();
    handler();
	}, [onClose, handler]);

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<div className={classNames(styles.modal, {}, [className])}>
				{imgSrc && <Image src={imgSrc} maxWidth={imgMaxWidth} />}
				{title && <h3>{title}</h3>}
				<Button onClick={handleConfirm} fluid>{btnLabel}</Button>
				<Button
					className={styles.modal__close}
					theme={ButtonTheme.CLEAR}
					size={ButtonSize.S}
					onClick={onClose}
				>
					close
				</Button>
			</div>
		</Modal>
	);
});

export default ConfirmModalTemplate;