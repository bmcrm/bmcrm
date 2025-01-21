import type { Table } from '@tanstack/react-table';
import { CustomCheckbox } from '@shared/ui/CustomCheckbox';
import styles from './TableTooltip.module.scss';

type TableContentProps<TData extends object> = {
	table: Table<TData>;
	handleClose: () => void;
};

const TableContent = <TData extends object>({ table, handleClose }: TableContentProps<TData>) => (
	<>
		<div className={styles.tooltip__row}>
			<h4 className={styles.tooltip__caption}>Columns visibility:</h4>
			<div className={styles.tooltip__column}>
				{table.getAllLeafColumns().map(column => (
					<CustomCheckbox
						key={column.id}
						label={column.columnDef.header as string}
						name={column.id}
						value={column.id}
						checked={column.getIsVisible()}
						onChange={() => {
							column.toggleVisibility();
							handleClose();
						}}
					/>
				))}
			</div>
		</div>
	</>
);

export { TableContent };