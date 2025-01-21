import { useEffect, useRef, type ReactNode, type RefObject } from 'react';
import type { Table, Header } from '@tanstack/react-table';
import { classNames } from '@shared/lib/classNames';
import { Tooltip } from '@shared/ui/Tooltip';
import { TableContent } from './TableContent';
import { ColumnContent } from './ColumnContent';
import { TableControlTheme } from '../../model/types/TableControl.types';
import styles from './TableTooltip.module.scss';

type TableTooltipProps<TData extends object> = {
	className?: string;
	theme: TableControlTheme;
	handleClose: () => void;
	btnRef: RefObject<HTMLButtonElement>;
	table?: Table<TData>;
	header?: Header<TData, unknown>;
};

const TableTooltip = <TData extends object>(props: TableTooltipProps<TData>) => {
	const { className, theme, table, header, btnRef, handleClose } = props;
	const tooltipRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as Node;

			if (
				tooltipRef.current &&
				!tooltipRef.current.contains(target) &&
				btnRef.current &&
				!btnRef.current.contains(target)
			) {
				handleClose();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [btnRef, handleClose]);

	const tooltipContent: Record<TableControlTheme, ReactNode> = {
		[TableControlTheme.TABLE]: table && <TableContent table={table} handleClose={handleClose} />,
		[TableControlTheme.COLUMN]: header && <ColumnContent header={header} handleClose={handleClose} />,
	};

	return (
		<Tooltip
			ref={tooltipRef}
			properties={{
				top: '100%',
				right: 0,
			}}
			className={classNames(styles.tooltip, {}, [className])}
		>
			{tooltipContent[theme]}
		</Tooltip>
	);
};

export { TableTooltip };