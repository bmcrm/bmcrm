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
	categories: string[] | null;
	inventoryItems?: IInventoryItem[];
	handleLoadMore?: () => void;
	inventoryIsLoading: boolean;
	isLoading: boolean;
	isLoadingNextPage?: boolean;
	hasNextPage?: boolean;
};

const InventoryCategories = memo((props: InventoryCategoriesProps) => {
	const {
		className,
		category,
		inventoryItems,
		inventoryIsLoading,
		isLoading,
		isLoadingNextPage,
		categories,
		handleLoadMore,
		hasNextPage,
	} = props;

	const filteredCategories = useMemo(() => {
		if (!categories || !inventoryItems) return null;

		return categories.filter(c =>
			c !== FixedCategories.ALL && inventoryItems.some(item => item.category === c)
		);
	}, [categories, inventoryItems]);

	const hasResults = useMemo(
		() => inventoryItems && inventoryItems.length > 0, [inventoryItems]
	);

	return (
		<div className={classNames(styles.categories, {}, [className])}>
			{category ? (
				<>
					{inventoryIsLoading && <Loader className={'m-centred-hv'}/>}
					{inventoryItems && inventoryItems.length > 0 && (
						<InventoryCategory
							category={category}
							items={inventoryItems}
							handleLoadMore={handleLoadMore}
							hasNextPage={hasNextPage}
							isLoadingNextPage={isLoadingNextPage}
						/>
					)}
					{!inventoryIsLoading && (!inventoryItems || inventoryItems.length === 0) && (
						<InventoryPlaceholder theme={InventoryPlaceholderTheme.INVALID_SEARCH}/>
					)}
				</>
			) : (
				<>
					{isLoading && <Loader className={'m-centred-hv'}/>}
					{!isLoading && !hasResults && (
						<InventoryPlaceholder theme={InventoryPlaceholderTheme.INVALID_SEARCH}/>
					)}
					{inventoryItems && filteredCategories?.map(fc => (
						<InventoryCategory
							key={fc}
							category={fc}
							items={inventoryItems.filter(item => item?.category === fc)}
						/>
					))}
				</>
			)}
		</div>
	);
});

export { InventoryCategories };