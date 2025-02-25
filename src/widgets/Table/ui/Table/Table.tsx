import { useCallback, useRef, useState, useEffect, type RefObject } from 'react';
import {
	useReactTable,
	getCoreRowModel,
	getFilteredRowModel,
	getSortedRowModel,
	type SortingState,
	type ColumnDef,
	type ColumnFiltersState,
	type VisibilityState,
} from '@tanstack/react-table';
import { classNames } from '@shared/lib/classNames';
import { useLocalStorage } from '@shared/hooks/useLocalStorage';
import { TableHead } from '../TableHead/TableHead';
import { TableBody } from '../TableBody/TableBody';
import { TableControl } from '../TableControl/TableControl';
import { Button, ButtonSize, ButtonTheme } from '@shared/ui/Button';
import { InviteButton } from '@features/InviteButton';
import { userState } from '@entities/User';
import { localStorageVars } from '@shared/const/localStorage';
import { CamperRole } from '@entities/Camper';
import { TableControlTheme } from '../../model/types/TableControl.types';
import styles from './Table.module.scss';

type TableProps<TData extends object> = {
	className?: string;
	title?: string;
	isInviteButton?: boolean;
	data: TData[];
	columns: ColumnDef<TData>[];
	portalTargetRef?: RefObject<HTMLDivElement>;
	tableScrollRef?: RefObject<HTMLDivElement>;
};

const Table = <TData extends object>(props: TableProps<TData>) => {
	const { className, title, isInviteButton, data, columns, portalTargetRef, tableScrollRef } = props;
	const internalPortalTargetRef = useRef<HTMLDivElement>(null);
	const innerTableScrollRef = useRef<HTMLDivElement>(null);
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const { tokens: { decodedIDToken } } = userState();
	const { getStorage } = useLocalStorage();
	const canInvite = decodedIDToken?.role === CamperRole.TCO || decodedIDToken?.role === CamperRole.COORG;
	const finalPortalRef = portalTargetRef || internalPortalTargetRef;
	const finalScrollRef = tableScrollRef || innerTableScrollRef;

	useEffect(() => {
		const storedVisibility = getStorage(localStorageVars.CAMPERS_TABLE_COLUMNS);

		if (storedVisibility) {
			const parsedVisibility = JSON.parse(storedVisibility);
			setColumnVisibility(parsedVisibility);
		}
	}, [getStorage]);

	const table = useReactTable({
		columns,
		data,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		onColumnVisibilityChange: setColumnVisibility,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
		},
	});

	const handleResetFilters = useCallback(() => {
		table.resetColumnFilters();
		table.resetSorting();
	}, [table]);

	return (
		<div className={classNames(styles.table, {}, [className])}>
			<div className={styles.table__header}>
				<div className={styles.table__row} style={{ gap: 10 }}>
					{title && <h2 className={styles.table__title}>{title}</h2>}
					{isInviteButton && canInvite && <InviteButton size={ButtonSize.S} />}
				</div>
				<div className={classNames(styles.table__row, {}, ['ml-a'])} style={{ gap: 10 }}>
					<Button
						className={styles.btnReset}
						theme={ButtonTheme.CLEAR}
            size={ButtonSize.TEXT}
            onClick={handleResetFilters}
					>
						Reset All Filters
					</Button>
					<TableControl table={table} theme={TableControlTheme.TABLE} />
				</div>
			</div>
			<div ref={finalPortalRef} className={styles.table__wrapper}>
				<div ref={finalScrollRef} className={styles.table__scroll}>
					<table className={styles.table__inner}>
						<TableHead table={table} portalTargetRef={finalPortalRef} tableScrollRef={finalScrollRef} />
						<TableBody table={table} />
					</table>
				</div>
			</div>
		</div>
	);
};

export default Table;