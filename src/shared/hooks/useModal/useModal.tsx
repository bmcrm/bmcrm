import { useCallback, useEffect, useRef, useState } from 'react';
import { clearAllBodyScrollLocks, disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

interface UseModalProps {
	isOpen?: boolean;
	onClose?: () => void;
	animationDelay: number;
}

let openModalCount = 0;

export const useModal = ({ isOpen, onClose, animationDelay }: UseModalProps) => {
	const [isClosing, setIsClosing] = useState(false);
	const [isMounted, setIsMounted] = useState(false);
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const modalRef = useRef<HTMLDivElement>(null);

	const close = useCallback(() => {
		if (!onClose || !modalRef.current) return;

		enableBodyScroll(modalRef.current);
		setIsClosing(true);

		timerRef.current = setTimeout(() => {
			setIsMounted(false);
			setIsClosing(false);
			onClose();
			openModalCount -= 1;

			if (openModalCount === 0) {
				clearAllBodyScrollLocks();
			}
		}, animationDelay);
	}, [animationDelay, onClose]);

	const onKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				close();
			}
		},
		[close]
	);

	useEffect(() => {
		if (isOpen) {
			setIsMounted(true);
		} else {
			close();
		}
	}, [isOpen, close]);

	useEffect(() => {
		if (isMounted && modalRef.current) {
			window.addEventListener('keydown', onKeyDown);
			openModalCount += 1;
			disableBodyScroll(modalRef.current);
		}

		return () => {
			if (timerRef.current) {
				clearTimeout(timerRef.current);
			}

			window.removeEventListener('keydown', onKeyDown);
			openModalCount -= 1;

			if (openModalCount === 0) {
				clearAllBodyScrollLocks();
			}
		};
	}, [isMounted, onKeyDown]);

	return {
		isMounted,
		close,
		isClosing,
		modalRef,
	};
};