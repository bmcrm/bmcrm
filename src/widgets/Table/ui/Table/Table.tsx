import { memo, useState } from 'react';
import {
	useReactTable,
	getCoreRowModel,
	getSortedRowModel,
	flexRender,
	type ColumnDef,
	type SortingState,
} from '@tanstack/react-table';
import { classNames } from '@shared/lib/classNames';
import type { ICamper } from '@entities/Camper';
import styles from './Table.module.scss';

type TableProps = {
	className?: string;
	data: ICamper[];
	columns: ColumnDef<ICamper>[];
};

const Table = memo((props: TableProps) => {
	const { className, data, columns } = props;
	const [sorting, setSorting] = useState<SortingState>([]);

	const table = useReactTable({
		columns,
		data,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		onSortingChange: setSorting,
		state: {
			sorting,
		},
	});

	return (
		<div className={classNames(styles.table__wrapper, {}, [className])}>
			<table className={styles.table}>
				<thead>
				{table.getHeaderGroups().map((headerGroup) => (
					<tr key={headerGroup.id}>
						{headerGroup.headers.map((header) => (
							<th key={header.id}>
								{header.isPlaceholder
									? null
									: (
										<div
											onClick={header.column.getToggleSortingHandler()}
										>
											{flexRender(
												header.column.columnDef.header,
												header.getContext()
											)}
											{{
												asc: ' 🔼',
												desc: ' 🔽',
											}[header.column.getIsSorted() as string] ?? null}
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
							<td key={cell.id}>
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
});

export default Table;