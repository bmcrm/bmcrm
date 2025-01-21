import { useEffect, useRef } from 'react';
import type { Header } from '@tanstack/react-table';
import { classNames } from '@shared/lib/classNames';
import { useToggle } from '@shared/hooks/useToggle';
import { Button, ButtonSize, ButtonTheme } from '@shared/ui/Button';
import { Icon, IconSize } from '@shared/ui/Icon';
import { TableTooltip } from '../TableTooltip/TableTooltip';
import styles from './TableControl.module.scss';
import DotsIcon from '@shared/assets/icons/three-dots-vertical_icon.svg';

type TableControlProps<TData extends object> = {
	className?: string;
	header: Header<TData, unknown>;
};

const TableControl = <TData extends object>({ className, header }: TableControlProps<TData>) => {
	const { isOpen, open, close } = useToggle();
	const tooltipRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
				close();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [close]);

	return (
		<div className={classNames(styles.control, {}, [className])}>
			<Button
				theme={ButtonTheme.CLEAR}
				size={ButtonSize.TEXT}
				className={styles.control__btn}
				onClick={open}
			>
				<Icon icon={<DotsIcon />} size={IconSize.SIZE_20} style={{ color: 'var(--color-black)' }} />
			</Button>
			{isOpen && <TableTooltip tooltipRef={tooltipRef} header={header} handleClose={close} />}
		</div>
	);
};

export { TableControl };