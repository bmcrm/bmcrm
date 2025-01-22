import { flexRender, type Table } from '@tanstack/react-table';
import { Icon, IconSize } from '@shared/ui/Icon';
import { TableControl } from '../TableControl/TableControl';
import { TableControlTheme } from '../../model/types/TableControl.types';
import styles from '../Table/Table.module.scss';
import AscIcon from '@shared/assets/icons/ascending_icon.svg';
import DescIcon from '@shared/assets/icons/descending_icon.svg';
import FilterIcon from '@shared/assets/icons/search_icon.svg';

type TableHeadProps<TData extends object> = {
	table: Table<TData>;
};

const TableHead = <TData extends object>({ table }: TableHeadProps<TData>) => (
	<thead>
	{table.getHeaderGroups().map((headerGroup) => (
		<tr key={headerGroup.id}>
			{headerGroup.headers.map((header) => (
				<th key={header.id} className={styles.table__cell}>
					{header.isPlaceholder
						? null
						: (
							<div className={styles.table__row}>
								<p className={styles.table__row}>
									{flexRender(
										header.column.columnDef.header,
										header.getContext()
									)}
									{header.column.getIsSorted() && (
										<Icon
											icon={header.column.getIsSorted() === 'asc' ? <AscIcon /> : <DescIcon />}
											size={IconSize.SIZE_20}
										/>
									)}
									{header.column.getIsFiltered() && (
										<Icon icon={<FilterIcon />} size={IconSize.SIZE_12} />
									)}
								</p>
								<TableControl theme={TableControlTheme.COLUMN} header={header} />
							</div>
						)
					}
				</th>
			))}
		</tr>
	))}
	</thead>
);

export { TableHead };