import { useCallback } from 'react';
import type { Table } from '@tanstack/react-table';
import { classNames } from '@shared/lib/classNames';
import { CustomCheckbox } from '@shared/ui/CustomCheckbox';
import { Button, ButtonColor, ButtonSize, ButtonTheme } from '@shared/ui/Button';
import { Icon, IconSize } from '@shared/ui/Icon';
import styles from './TableTooltip.module.scss';
import ResetIcon from '@shared/assets/icons/error.svg';

type TableContentProps<TData extends object> = {
	table: Table<TData>;
	handleClose: () => void;
};

const TableContent = <TData extends object>({ table, handleClose }: TableContentProps<TData>) => {

	const handleReset = useCallback(() => {
		table.resetColumnFilters();
		table.resetSorting();
		handleClose();
	}, [handleClose, table]);

	return (
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
							onChange={() => column.toggleVisibility()}
						/>
					))}
				</div>
			</div>
			<div className={classNames(styles.tooltip__row, {}, [styles.fluid])}>
				<Button
					theme={ButtonTheme.CLEAR}
					size={ButtonSize.TEXT}
					color={ButtonColor.BLACK}
					className={styles.tooltip__btn}
					onClick={handleReset}
					fluid
				>
					<Icon icon={<ResetIcon />} size={IconSize.SIZE_16} />
					Reset All
				</Button>
			</div>
		</>
	);
};

export { TableContent };