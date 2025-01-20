import { useCallback, useEffect, useRef } from 'react';
import type { Header } from '@tanstack/react-table';
import { classNames } from '@shared/lib/classNames';
import { useToggle } from '@shared/hooks/useToggle';
import { Button, ButtonColor, ButtonSize, ButtonTheme } from '@shared/ui/Button';
import { Icon, IconSize } from '@shared/ui/Icon';
import { Tooltip } from '@shared/ui/Tooltip';
import { Search, SearchTheme } from '@features/Search';
import styles from './TableControl.module.scss';
import DotsIcon from '@shared/assets/icons/three-dots-vertical_icon.svg';
import AscIcon from '@shared/assets/icons/arrow-top.svg';
import DescIcon from '@shared/assets/icons/arrow-top.svg';
import ClearSortIcon from '@shared/assets/icons/arrow-top.svg';

type TableControlProps<TData extends object> = {
	className?: string;
	header: Header<TData, unknown>;
};

const TableControl = <TData extends object>({ className, header }: TableControlProps<TData>) => {
	const { isOpen, open, close } = useToggle();
	const tooltipRef = useRef<HTMLDivElement>(null);
	const columnFilterValue = header.column.getFilterValue();
	const isSorted = header.column.getIsSorted();

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
				close();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [close]);

	const handleSort = useCallback((action: () => void) => {
		action();
		close();
	}, [close]);

	return (
		<div className={classNames(styles.control, {}, [className])}>
			<Button
				theme={ButtonTheme.CLEAR}
				size={ButtonSize.TEXT}
				className={styles.control__btn}
				onClick={open}
			>
				<Icon icon={<DotsIcon />} size={IconSize.SIZE_20} style={{ color: 'var(--color-black)' }} />
			</Button>
			{isOpen && (
				<Tooltip
					ref={tooltipRef}
					properties={{
						top: '100%',
						right: 0,
					}}
					className={styles.tooltip}
				>
					<div className={classNames(styles.tooltip__row, {}, [styles.fluid])}>
						{isSorted !== 'asc' && (
							<Button
								theme={ButtonTheme.CLEAR}
								size={ButtonSize.TEXT}
								color={ButtonColor.BLACK}
								className={styles.tooltip__btn}
								onClick={() => handleSort(() => header.column.toggleSorting(false))}
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
								onClick={() => handleSort(() => header.column.toggleSorting(true))}
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
								onClick={() => handleSort(() => header.column.clearSorting())}
								fluid
							>
								<Icon icon={<ClearSortIcon />} size={IconSize.SIZE_16} />
								Clear Sort
							</Button>
						)}
					</div>
					<div className={styles.tooltip__row}>
						<Search
							theme={SearchTheme.TABLE}
							maxWidth={245}
							placeholder={'Search...'}
							value={(columnFilterValue ?? '') as string}
							onChange={value => header.column.setFilterValue(value)}
						/>
					</div>
				</Tooltip>
			)}
		</div>
	);
};

export { TableControl };