import { memo, useMemo } from 'react';
import { classNames } from '@shared/lib/classNames';
import { Loader } from '@shared/ui/Loader';
import { InventoryCategory } from '../InventoryCategory/InventoryCategory';
import { InventoryPlaceholder } from '../InventoryPlaceholder/InventoryPlaceholder';
import type { IInventoryItem } from '@entities/Inventory';
import { InventoryPlaceholderTheme } from '../../model/types/InventoryPlaceholder.types';
import { FixedCategories } from '../../model/types/InventroyPage.types';
import styles from './InventoryCategories.module.scss';

type InventoryCategoriesProps = {
	className?: string;
	category?: string;
	inventory?: IInventoryItem[];
	inventoryIsLoading: boolean;
	isLoading: boolean;
	categories: string[] | null;
};

const InventoryCategories = memo((props: InventoryCategoriesProps) => {
	const { className, category, inventory, inventoryIsLoading, isLoading, categories } = props;

	const filteredCategories = useMemo(() => {
		if (!categories || !inventory) return null;

		return categories.filter(c =>
			c !== FixedCategories.ALL && inventory.some(item => item.category === c)
		);
	}, [categories, inventory]);

	const hasResults = useMemo(() => inventory && inventory.length > 0, [inventory]);

	return (
		<div className={classNames(styles.categories, {}, [className])}>
			{category ? (
				<>
					{inventoryIsLoading && <Loader className={'m-centred-hv'} />}
					{inventory && inventory.length > 0 && (
						<InventoryCategory category={category} items={inventory} />
					)}
					{!inventoryIsLoading && (!inventory || inventory.length === 0) && (
						<InventoryPlaceholder theme={InventoryPlaceholderTheme.INVALID_SEARCH} />
					)}
				</>
			) : (
				<>
					{isLoading && <Loader className={'m-centred-hv'} />}
					{!isLoading && !hasResults && (
						<InventoryPlaceholder theme={InventoryPlaceholderTheme.INVALID_SEARCH} />
					)}
					{inventory && filteredCategories?.map(c => (
						<InventoryCategory
							key={c}
							category={c}
							items={inventory.filter(item => item?.category === c)}
						/>
					))}
				</>
			)}
		</div>
	);
});

export { InventoryCategories };