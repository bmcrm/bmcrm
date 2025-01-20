import { useState } from 'react';
import {
	useReactTable,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getSortedRowModel,
	type SortingState,
	type ColumnDef,
	type ColumnFiltersState,
} from '@tanstack/react-table';
import { classNames } from '@shared/lib/classNames';
import { Icon, IconSize } from '@shared/ui/Icon';
import { TableControl } from '../TableControl/TableControl';
import styles from './Table.module.scss';
import AscIcon from '@shared/assets/icons/arrow-top.svg';
import DescIcon from '@shared/assets/icons/arrow-top.svg';
import FilterIcon from '@shared/assets/icons/eye_open.svg';

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
				<thead>
				{table.getHeaderGroups().map((headerGroup) => (
					<tr key={headerGroup.id}>
						{headerGroup.headers.map((header) => (
							<th key={header.id} className={styles.table__cell}>
								{header.isPlaceholder
									? null
									: (
										<div className={styles.table__row}>
											<div className={styles.table__row}>
												{flexRender(
													header.column.columnDef.header,
													header.getContext()
												)}
												{header.column.getIsSorted() && (
													<Icon
														icon={header.column.getIsSorted() === 'asc' ? <AscIcon /> : <DescIcon />}
														size={IconSize.SIZE_16}
													/>
												)}
												{header.column.getIsFiltered() && (
													<Icon icon={<FilterIcon />} size={IconSize.SIZE_16} />
												)}
											</div>
											<TableControl header={header} />
										</div>
									)
								}
							</th>
						))}
					</tr>
				))}
				</thead>
				<tbody>
				{table.getRowModel().rows.map((row) => (
					<tr key={row.id}>
						{row.getVisibleCells().map((cell) => (
							<td key={cell.id} className={styles.table__cell}>
								{flexRender(
									cell.column.columnDef.cell,
									cell.getContext()
								)}
							</td>
						))}
					</tr>
				))}
				</tbody>
			</table>
		</div>
	);
};

export default Table;