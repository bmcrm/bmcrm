import { flexRender, type Table } from '@tanstack/react-table';
import styles from '../Table/Table.module.scss';

type TableBodyProps<TData extends object> = {
	table: Table<TData>;
};

const TableBody = <TData extends object>({ table }: TableBodyProps<TData>) => (
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
);

export { TableBody };