import { useCallback, useRef, type MouseEvent, type ReactNode, type RefObject } from 'react';
import type { Header, Table } from '@tanstack/react-table';
import { classNames } from '@shared/lib/classNames';
import { useToggle } from '@shared/hooks/useToggle';
import { Button, ButtonSize, ButtonTheme } from '@shared/ui/Button';
import { Icon, IconSize } from '@shared/ui/Icon';
import { TableTooltip } from '../TableTooltip/TableTooltip';
import { TableControlTheme } from '../../model/types/TableControl.types';
import styles from './TableControl.module.scss';
import DotsIcon from '@shared/assets/icons/three-dots-vertical_icon.svg';
import SettingsIcon from '@shared/assets/icons/settings_icon.svg';

type TableControlProps<TData extends object> = {
	className?: string;
	theme: TableControlTheme;
	table?: Table<TData>;
	header?: Header<TData, unknown>;
	portalTargetRef?: RefObject<HTMLDivElement>;
	tableScrollRef?: RefObject<HTMLDivElement>;
};

const TableControl = <TData extends object>(props: TableControlProps<TData>) => {
	const { className, theme, table, header, portalTargetRef, tableScrollRef } = props;
	const { isOpen, open, close } = useToggle();
	const btnRef = useRef<HTMLButtonElement>(null);

	const handleOpenTooltip = useCallback((event: MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();
		
		if (isOpen) {
			close();
		} else {
			open();
		}
	}, [close, isOpen, open]);

	const controlContent: Record<TableControlTheme, { icon: ReactNode }> = {
		[TableControlTheme.TABLE]: {
			icon: <SettingsIcon />,
		},
		[TableControlTheme.COLUMN]: {
			icon: <DotsIcon />,
		},
	};

	return (
		<div className={classNames(styles.control, {}, [className, styles[theme]])}>
			<Button
				ref={btnRef}
				theme={ButtonTheme.CLEAR}
				size={ButtonSize.TEXT}
				className={styles.control__btn}
				onClick={handleOpenTooltip}
			>
				<Icon icon={controlContent[theme].icon} size={IconSize.SIZE_20} className={styles.control__icon} />
			</Button>
			{isOpen && (
				<TableTooltip
					theme={theme}
					table={table}
					header={header}
					handleClose={close}
					btnRef={btnRef}
					portalTargetRef={portalTargetRef}
					tableScrollRef={tableScrollRef}
				/>
			)}
		</div>
	);
};

export { TableControl };