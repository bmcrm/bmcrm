import { useCallback } from 'react';
import type { Table } from '@tanstack/react-table';
import { useLocalStorage } from '@shared/hooks/useLocalStorage';
import { CustomCheckbox } from '@shared/ui/CustomCheckbox';
import { localStorageVars } from '@shared/const/localStorage';
import styles from './TableTooltip.module.scss';

type TableContentProps<TData extends object> = {
	table: Table<TData>;
};

const TableContent = <TData extends object>({ table }: TableContentProps<TData>) => {
	const { setStorage } = useLocalStorage();

	const handleColumnToggle = useCallback((columnId: string) => {
		const newState = {
			...table.getAllLeafColumns().reduce((acc, col) => {
				acc[col.id] = col.getIsVisible();
				return acc;
			}, {} as Record<string, boolean>),
			[columnId]: !table.getColumn(columnId)?.getIsVisible(),
		};

		setStorage(localStorageVars.CAMPERS_TABLE_COLUMNS, JSON.stringify(newState));
		table.getColumn(columnId)?.toggleVisibility();
	}, [table, setStorage]);

	const handleToggleAll = useCallback(() => {
		const newState = table.getIsAllColumnsVisible()
			? Object.fromEntries(table.getAllLeafColumns().map(col => [col.id, false]))
			: Object.fromEntries(table.getAllLeafColumns().map(col => [col.id, true]));

		setStorage(localStorageVars.CAMPERS_TABLE_COLUMNS, JSON.stringify(newState));
		table.toggleAllColumnsVisible();
	}, [table, setStorage]);

	return (
		<div className={styles.tooltip__row}>
			<h4 className={styles.tooltip__caption}>Columns visibility:</h4>
			<div className={styles.tooltip__column}>
				<CustomCheckbox
					label={'Toggle All'}
					checked={table.getIsAllColumnsVisible()}
					onChange={handleToggleAll}
				/>
				{table.getAllLeafColumns().map(column => (
					<CustomCheckbox
						key={column.id}
						label={column.columnDef.header as string}
						name={column.id}
						value={column.id}
						checked={column.getIsVisible()}
						onChange={() => handleColumnToggle(column.id)}
					/>
				))}
			</div>
		</div>
	);
};

export { TableContent };