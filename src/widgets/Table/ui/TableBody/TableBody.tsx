import { flexRender, type Table } from '@tanstack/react-table';
import { classNames } from '@shared/lib/classNames';
import styles from '../Table/Table.module.scss';

type TableBodyProps<TData extends object> = {
	table: Table<TData>;
};

const TableBody = <TData extends object>({ table }: TableBodyProps<TData>) => (
	<tbody>
	{table.getRowModel().rows.map((row) => (
		<tr key={row.id}>
			{row.getVisibleCells().map((cell) => {
				const meta = cell.column.columnDef.meta as { className?: string } | undefined;
				const className = meta?.className;

				return (
					<td key={cell.id} className={classNames(styles.table__cell, {}, [className])}>
						{flexRender(
							cell.column.columnDef.cell,
							cell.getContext()
						)}
					</td>
				);
			})}
		</tr>
	))}
	</tbody>
);

export { TableBody };