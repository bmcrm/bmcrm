import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useToggle } from '@shared/hooks/useToggle';
import { useDebounce } from '@shared/hooks/useDebounce';
import { Container } from '@shared/ui/Container';
import { AddInventoryModal } from '@features/AddInventoryModal';
import { InventoryNav } from '../InventoryNav/InventoryNav';
import { InventoryCategories } from '../InventoryCategories/InventoryCategories';
import { InventoryControl } from '../InventoryControl/InventoryControl';
import { InventoryPlaceholder } from '../InventoryPlaceholder/InventoryPlaceholder';
import { useGetCategories, useGetInventory } from '@entities/Inventory';
import { FixedCategories } from '../../model/types/InventroyPage.types';
import { InventoryPlaceholderTheme } from '../../model/types/InventoryPlaceholder.types';
import styles from './InventoryPage.module.scss';

const FIXED_CATEGORIES = [FixedCategories.ALL];
const NEWEST_LIMIT = 5;

const InventoryPage = () => {
	const [searchQuery, setSearchQuery] = useState('');
	const debouncedSearchQuery = useDebounce(searchQuery, 400);
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
		if (!isValidCategory) return null;

		const params: { category?: string; limit?: string; title?: string } = {
			...(category === FixedCategories.NEWEST
				? { category: FixedCategories.NEWEST, limit: String(NEWEST_LIMIT) }
				: category ? { category } : {}),
		};

		if (debouncedSearchQuery.trim()) {
			params.title = `${debouncedSearchQuery.trim()}`;
		}

		return params;
	}, [category, debouncedSearchQuery, isValidCategory]);

	const { data: inventory, isLoading: inventoryIsLoading } = useGetInventory({ queryParams, enabled: isValidCategory });
	const isLoading = inventoryIsLoading || categoriesIsLoading;

	useEffect(() => {
		setSearchQuery('');
	}, [category]);

	return (
		<>
			<section className={styles.inventory}>
				<Container className={styles.inventory__container} fluid>
					{categoriesFromApi && categoriesFromApi.length > 0 && categories ? (
						<>
							<InventoryNav categories={categories} />
							<InventoryControl
								handleOpen={open}
								value={searchQuery}
								onChange={setSearchQuery}
							/>
							{isValidCategory ? (
								<InventoryCategories
									category={category}
									categories={categories}
									inventory={inventory}
									isLoading={isLoading}
									inventoryIsLoading={inventoryIsLoading}
								/>
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
