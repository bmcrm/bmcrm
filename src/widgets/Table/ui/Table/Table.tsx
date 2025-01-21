import { useState } from 'react';
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
import { TableHead } from '../TableHead/TableHead';
import { TableBody } from '../TableBody/TableBody';
import { TableControl } from '../TableControl/TableControl';
import { TableControlTheme } from '../../model/types/TableControl.types';
import styles from './Table.module.scss';

type TableProps<TData extends object> = {
	className?: string;
	title?: string;
	data: TData[];
	columns: ColumnDef<TData>[];
};

const Table = <TData extends object>(props: TableProps<TData>) => {
	const { className, title, data, columns } = props;
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

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

	return (
		<div className={classNames(styles.table__wrapper, {}, [className])}>
			<div className={styles.table__header}>
				{title && <h2 className={styles.table__title}>{title}</h2>}
				<TableControl table={table} theme={TableControlTheme.TABLE} />
			</div>
			<table className={styles.table}>
				<TableHead table={table} />
				<TableBody table={table} />
			</table>
		</div>
	);
};

export default Table;