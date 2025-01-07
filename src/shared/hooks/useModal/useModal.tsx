import { useCallback, useEffect, useRef, useState } from 'react';
import { clearAllBodyScrollLocks, disableBodyScroll } from 'body-scroll-lock';
import { appState } from '@entities/App';

interface UseModalProps {
	isOpen?: boolean;
	onClose?: () => void;
	animationDelay: number;
}

export const useModal = ({ isOpen, onClose, animationDelay }: UseModalProps) => {
	const [isClosing, setIsClosing] = useState(false);
	const [isMounted, setIsMounted] = useState(false);
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const modalRef = useRef<HTMLDivElement>(null);
	const { incrementModalCount, decrementModalCount } = appState();

	const close = useCallback(() => {
		if (!onClose || !modalRef.current) return;
		setIsClosing(true);

		timerRef.current = setTimeout(() => {
			setIsMounted(false);
			setIsClosing(false);
			onClose();
			decrementModalCount();
		}, animationDelay);
	}, [animationDelay, decrementModalCount, onClose]);

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
			incrementModalCount();
		} else {
			close();
		}
	}, [isOpen, close, incrementModalCount]);

	useEffect(() => {
		if (isMounted && modalRef.current) {
			window.addEventListener('keydown', onKeyDown);
			disableBodyScroll(modalRef.current);
		}

		return () => {
			if (timerRef.current) {
				clearTimeout(timerRef.current);
			}

			window.removeEventListener('keydown', onKeyDown);

			if (appState.getState().modalCount === 0) {
				clearAllBodyScrollLocks();
			}
		};
	}, [isMounted, isOpen, onClose, onKeyDown]);

	return {
		isMounted,
		close,
		isClosing,
		modalRef,
	};
};