import { useState } from 'react';
import {
	useReactTable,
	getCoreRowModel,
	getFilteredRowModel,
	getSortedRowModel,
	type SortingState,
	type ColumnDef,
	type ColumnFiltersState,
} from '@tanstack/react-table';
import { classNames } from '@shared/lib/classNames';
import { TableHead } from '../TableHead/TableHead';
import { TableBody } from '../TableBody/TableBody';
import styles from './Table.module.scss';

type TableProps<TData extends object> = {
	className?: string;
	data: TData[];
	columns: ColumnDef<TData>[];
};

const Table = <TData extends object>(props: TableProps<TData>) => {
	const { className, data, columns } = props;
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

	const table = useReactTable({
		columns,
		data,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		state: {
			sorting,
			columnFilters,
		},
	});

	return (
		<div className={classNames(styles.table__wrapper, {}, [className])}>
			<table className={styles.table}>
				<TableHead table={table} />
				<TableBody table={table} />
			</table>
		</div>
	);
};

export default Table;