import { memo } from 'react';
import { classNames } from '@shared/lib/classNames';
import { InventoryCard } from '@features/InventoryCard';
import type { IInventoryItem } from '@entities/Inventory';
import styles from './InventoryCategory.module.scss';

type InventoryCategoryProps = {
	className?: string;
	category?: string;
	items?: IInventoryItem[];
};

const InventoryCategory = memo(({ className, category, items }: InventoryCategoryProps) => (
	<div className={classNames(styles.category, {}, [className])}>
		<h2 className={styles.category__title}>{category}<span className={styles.counter}> - {items?.length}</span></h2>
		<ul className={styles.category__list}>
			{items?.map(item => <InventoryCard key={item.id} item={item}/>)}
		</ul>
	</div>
));

export { InventoryCategory };