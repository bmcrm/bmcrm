import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useToggle } from '@shared/hooks/useToggle';
import { Container } from '@shared/ui/Container';
import { Button } from '@shared/ui/Button';
import { Loader } from '@shared/ui/Loader';
import { AddInventoryModal } from '@features/AddInventoryModal';
import { InventoryNav } from '../InventoryNav/InventoryNav';
import { InventoryCategory } from '../InventoryCategory/InventoryCategory';
import { InventoryPlaceholder } from '../InventoryPlaceholder/InventoryPlaceholder';
import { useGetCategories, useGetInventory } from '@entities/Inventory';
import { FixedCategories } from '../../model/types/InventroyPage.types';
import { InventoryPlaceholderTheme } from '../../model/types/InventoryPlaceholder.types';
import styles from './InventoryPage.module.scss';

const FIXED_CATEGORIES = [FixedCategories.ALL];
const NEWEST_LIMIT = 5;

const InventoryPage = () => {
	const { isOpen, open, close } = useToggle();
	const { category } = useParams<{ category: string }>();
	const { data: categoriesFromApi, isLoading: categoriesIsLoading } = useGetCategories();

	const categories = useMemo(() => categoriesFromApi
			? [...FIXED_CATEGORIES, ...categoriesFromApi]
			: null,
		[categoriesFromApi]
	);

	const isValidCategory = useMemo(
		() => !category || categories?.includes(category),
		[category, categories]
	);

	const queryParams = useMemo(() => {
		if (!isValidCategory) return undefined;

		return category === FixedCategories.NEWEST
			? { category: FixedCategories.NEWEST, limit: String(NEWEST_LIMIT) }
			: category ? { category } : {};
	}, [category, isValidCategory]);

	const { data: inventory, isLoading: inventoryIsLoading } = useGetInventory({ queryParams, enabled: isValidCategory });
	const isLoading = inventoryIsLoading || categoriesIsLoading;

	return (
		<>
			<section className={styles.inventory}>
				<Container className={styles.inventory__container} fluid>
					{categoriesFromApi && categoriesFromApi.length > 0 && categories ? (
						<>
							<InventoryNav categories={categories} />
							<Button onClick={open} className={'ml-a mt-30'}>Add inventory</Button>
							{isValidCategory ? (
								<div className={styles.inventory__categories}>
									{category ? (
										<InventoryCategory category={category} items={inventory} isLoading={inventoryIsLoading} />
									) : (
										<>
											{isLoading && <Loader className={'m-centred-hv'} />}
											{inventory && categories.filter(c => c !== FixedCategories.ALL).map(c => (
												<InventoryCategory
													key={c}
													category={c}
													items={inventory?.filter(item => item?.category === c)}
												/>
											))}
										</>
									)}
								</div>
							) : (
								<InventoryPlaceholder theme={InventoryPlaceholderTheme.INVALID_CATEGORY} />
							)}
						</>
					) : (
						!isLoading && <InventoryPlaceholder handleAddInventory={open} theme={InventoryPlaceholderTheme.EMPTY_INVENTORY} />
					)}
				</Container>
			</section>
			<AddInventoryModal isOpen={isOpen} onClose={close} />
		</>
	);
};

export default InventoryPage;
