import { useEffect, useRef, useState, useCallback, type ReactNode, type RefObject, type CSSProperties } from 'react';
import type { Table, Header } from '@tanstack/react-table';
import { useMedia } from '@shared/hooks/useMedia';
import { classNames } from '@shared/lib/classNames';
import { Tooltip } from '@shared/ui/Tooltip';
import { Portal } from '@shared/ui/Portal';
import { TableContent } from './TableContent';
import { ColumnContent } from './ColumnContent';
import { TableControlTheme } from '../../model/types/TableControl.types';
import styles from './TableTooltip.module.scss';

type TableTooltipProps<TData extends object> = {
	className?: string;
	theme: TableControlTheme;
	handleClose: () => void;
	table?: Table<TData>;
	header?: Header<TData, unknown>;
	btnRef: RefObject<HTMLButtonElement>;
	portalTargetRef?: RefObject<HTMLDivElement>;
	tableScrollRef?: RefObject<HTMLDivElement>;
};

const TableTooltip = <TData extends object>(props: TableTooltipProps<TData>) => {
	const { className, theme, table, header, btnRef, portalTargetRef, tableScrollRef, handleClose } = props;
	const tooltipRef = useRef<HTMLDivElement>(null);
	const [tooltipProperties, setTooltipProperties] = useState<CSSProperties>();
	const [isPositionReady, setIsPositionReady] = useState(false);
	const { isMobile } = useMedia();

	const calculatePosition = useCallback(() => {
		if (btnRef.current && portalTargetRef?.current) {
			const btnRect = btnRef.current.getBoundingClientRect();
			const portalRect = portalTargetRef.current.getBoundingClientRect();
			const isFirstColumn = header?.index === 0;

			setTooltipProperties({
				top: btnRect.bottom - portalRect.top,
				left: isMobile && isFirstColumn
					? btnRect.left - portalRect.left
					: undefined,
				right: isMobile && isFirstColumn
					? undefined
					: portalRect.right - btnRect.right,
			});

			setIsPositionReady(true);
		} else {
			setTooltipProperties({
				top: '100%',
				right: 0,
			});
			setIsPositionReady(true);
		}
	}, [header?.index, isMobile, btnRef.current, portalTargetRef?.current]);

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

	useEffect(() => {
		calculatePosition();
		const tableScroll = tableScrollRef?.current;

		if (tableScroll) {
			tableScroll.addEventListener('scroll', calculatePosition);
		}

		return () => {
			if (tableScroll) {
				tableScroll.removeEventListener('scroll', calculatePosition);
			}
		};
	}, [calculatePosition, tableScrollRef]);

	const tooltipContent: Record<TableControlTheme, ReactNode> = {
		[TableControlTheme.TABLE]: table && <TableContent table={table} />,
		[TableControlTheme.COLUMN]: header && <ColumnContent header={header} handleClose={handleClose} />,
	};

	const tooltip = isPositionReady ? (
		<Tooltip
			ref={tooltipRef}
			properties={tooltipProperties}
			className={classNames(styles.tooltip, {}, [className])}
		>
			{tooltipContent[theme]}
		</Tooltip>
	) : null;

	return portalTargetRef?.current ? (
		<Portal element={portalTargetRef.current}>{tooltip}</Portal>
	) : (
		tooltip
	);
};

export { TableTooltip };