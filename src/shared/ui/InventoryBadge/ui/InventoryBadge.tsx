import { memo, type ReactNode } from 'react';
import { classNames } from '@shared/lib/classNames';
import styles from './InventoryBadge.module.scss';

type InventoryBadgeProps = {
	className?: string;
	label: string | ReactNode;
};

const InventoryBadge = memo(({ className, label }: InventoryBadgeProps) => (
	<div className={classNames(styles.badge, {}, [className])}>{label}</div>
));

export default InventoryBadge;