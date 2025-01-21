import { useCallback } from 'react';
import type { Header } from '@tanstack/react-table';
import { classNames } from '@shared/lib/classNames';
import { Button, ButtonColor, ButtonSize, ButtonTheme } from '@shared/ui/Button';
import { Icon, IconSize } from '@shared/ui/Icon';
import { Search, SearchTheme } from '@features/Search';
import { CustomCheckbox } from '@shared/ui/CustomCheckbox';
import { CamperRole } from '@entities/Camper';
import styles from './TableTooltip.module.scss';
import AscIcon from '@shared/assets/icons/ascending_icon.svg';
import DescIcon from '@shared/assets/icons/descending_icon.svg';
import ClearSortIcon from '@shared/assets/icons/clear-sort_icon.svg';

type ColumnContentProps<TData extends object> = {
	header: Header<TData, unknown>;
	handleClose: () => void;
};

const ColumnContent = <TData extends object>({ header, handleClose }: ColumnContentProps<TData>) => {
	const columnFilterValue = header.column.getFilterValue();
	const isSorted = header.column.getIsSorted();

	const handleSort = useCallback((action: () => void) => {
		action();
		handleClose();
	}, [handleClose]);

	return (
		<>
			<div className={classNames(styles.tooltip__row, {}, [styles.fluid])}>
				{isSorted !== 'asc' && (
					<Button
						theme={ButtonTheme.CLEAR}
						size={ButtonSize.TEXT}
						color={ButtonColor.BLACK}
						className={styles.tooltip__btn}
						onClick={() => handleSort(() => header?.column.toggleSorting(false))}
						fluid
					>
						<Icon icon={<AscIcon />} size={IconSize.SIZE_16} />
						Sort Ascending
					</Button>
				)}
				{isSorted !== 'desc' && (
					<Button
						theme={ButtonTheme.CLEAR}
						size={ButtonSize.TEXT}
						color={ButtonColor.BLACK}
						className={styles.tooltip__btn}
						onClick={() => handleSort(() => header?.column.toggleSorting(true))}
						fluid
					>
						<Icon icon={<DescIcon />} size={IconSize.SIZE_16} />
						Sort Descending
					</Button>
				)}
				{isSorted && (
					<Button
						theme={ButtonTheme.CLEAR}
						size={ButtonSize.TEXT}
						color={ButtonColor.BLACK}
						className={styles.tooltip__btn}
						onClick={() => handleSort(() => header?.column.clearSorting())}
						fluid
					>
						<Icon icon={<ClearSortIcon />} size={IconSize.SIZE_16} />
						Clear Sort
					</Button>
				)}
			</div>
			{header.id === 'role' ? (
				<div className={styles.tooltip__row}>
					<h4 className={styles.tooltip__caption}>Filter by role:</h4>
					<div className={styles.tooltip__flex}>
						{Object.values(CamperRole).map((role) => {
							const currentFilterValue = (header.column.getFilterValue() ?? []) as string[];
							const isChecked = currentFilterValue.includes(role);

							return (
								<CustomCheckbox
									key={role}
									label={role}
									name={role}
									value={role}
									checked={isChecked}
									onChange={(e) => {
										const isAdding = e.target.checked;
										const newFilterValue = isAdding
											? [...currentFilterValue, role]
											: currentFilterValue.filter((r) => r !== role);

										header.column.setFilterValue(newFilterValue.length > 0 ? newFilterValue : undefined);
									}}
								/>
							);
						})}
					</div>
				</div>
			) : (
				<div className={styles.tooltip__row}>
					<Search
						theme={SearchTheme.TABLE}
						maxWidth={245}
						placeholder={'Search...'}
						value={(columnFilterValue ?? '') as string}
						onChange={value => header?.column.setFilterValue(value)}
					/>
				</div>
			)}
		</>
	);
};

export { ColumnContent };