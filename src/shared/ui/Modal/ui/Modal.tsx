import { useCallback, type ReactNode, type MouseEvent } from 'react';
import { classNames } from '@shared/lib/classNames';
import { useModal } from '@shared/hooks/useModal';
import { Portal } from '@shared/ui/Portal';
import { MODAL_ANIMATION_DELAY } from '@shared/const/animations';
import styles from './Modal.module.scss';

interface ModalProps {
  className?: string;
  children?: ReactNode;
  isOpen: boolean;
  isOverflow?: boolean;
  onClose?: () => void;
}

const Modal = (props: ModalProps) => {
  const { className, children, isOpen, isOverflow = false, onClose } = props;
  const { isMounted, isClosing, modalRef, close } = useModal({
    isOpen,
    onClose,
    animationDelay: MODAL_ANIMATION_DELAY,
  });

  const mods = {
    [styles.open]: isOpen,
    [styles.closing]: isClosing,
    [styles.overflow]: isOverflow,
  };

  const onContentClick = useCallback((e: MouseEvent) => {
    e.stopPropagation();
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Portal>
      <div className={classNames(styles.modal, mods, [])}>
        <div className={styles.modal__overlay} onClick={close}>
          <div ref={modalRef} className={classNames(styles.modal__content, {}, [className])} onClick={onContentClick}>
            {children}
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default Modal;
