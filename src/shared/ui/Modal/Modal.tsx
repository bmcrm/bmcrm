import styles from './Modal.module.scss';
import React, { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { classNames, type Mods } from 'shared/lib/classNames/classNames';
import Portal from 'shared/ui/Portal/Portal';

type ModalProps = {
  className?: string;
  children?: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
};

const ANIMATION_DELAY = 300;

const Modal = (props: ModalProps) => {
  const {
    className,
    children,
    isOpen,
    onClose,
  } = props;
  const [isClosing, setIsClosing] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const mods: Mods = {
    [styles.open]: isOpen,
    [styles.closing]: isClosing,
  };

  const closeHandler = useCallback(() => {
    if (onClose) {
      setIsClosing(true);
      timerRef.current = setTimeout(() => {
        onClose();
        setIsClosing(false);
      }, ANIMATION_DELAY);
    }
  }, [onClose]);

  const onContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const onKeydown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') closeHandler();
  }, [closeHandler]);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', onKeydown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      clearTimeout(timerRef.current);
      window.removeEventListener('keydown', onKeydown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onKeydown]);


  return (
    <Portal>
      <div className={classNames(styles.modal, mods, [className])}>
        <div className={styles.modal__overlay} onClick={closeHandler}>
          <div className={styles.modal__content} onClick={onContentClick}>
            {children}
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default Modal;
