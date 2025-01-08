import { useParams } from 'react-router-dom';
import { useToggle } from '@shared/hooks/useToggle';
import { Container } from '@shared/ui/Container';
import { Button } from '@shared/ui/Button';
import { FormLoader } from '@features/FormLoader';
import { AddInventoryModal } from '@features/AddInventoryModal';
import { InventoryNav } from '../InventoryNav/InventoryNav';
import { InventoryCategory } from '../InventoryCategory/InventoryCategory';
import { InventoryPlaceholder } from '../InventoryPlaceholder/InventoryPlaceholder';
import { useGetCategories, useGetInventory } from '@entities/Inventory';
import { InventoryPlaceholderTheme } from '../../model/types/InventoryPlaceholder.types';
import styles from './InventoryPage.module.scss';

const InventoryPage = () => {
	const { category } = useParams<{ category: string }>();
	const { data: categories, isLoading: categoriesIsLoading } = useGetCategories();
	const { data: inventory, isLoading: inventoryIsLoading } = useGetInventory();
	const { isOpen, open, close } = useToggle();
	const isLoading = inventoryIsLoading || categoriesIsLoading;

	const isValidCategory = !category || (categories && categories.includes(category));
	const filteredInventory = category
		? inventory?.filter(item => item?.category === category)
		: inventory;

	if (isLoading && !categories?.length) return <FormLoader />;

	return (
		<>
			<section className={styles.inventory}>
				<Container className={styles.inventory__container} fluid>
					{categories && categories.length > 0 && (
						<>
							<InventoryNav categories={categories} />
							<Button onClick={open} className={'ml-a mt-30'}>Add inventory</Button>
							{isValidCategory ? (
								<div className={styles.inventory__categories}>
									{filteredInventory && filteredInventory.length > 0 && (
										<>
											{category ? (
												<InventoryCategory
													category={category}
													items={filteredInventory}
												/>
											) : (
												<>
													{categories.map(category => (
														<InventoryCategory
															key={category}
															category={category}
															items={filteredInventory.filter(item => item?.category === category)}
														/>
													))}
												</>
											)}
										</>
									)}
								</div>
							) : (
								<InventoryPlaceholder theme={InventoryPlaceholderTheme.INVALID_CATEGORY} />
							)}
						</>
					)}
					{!categories?.length && !inventory?.length && (
						<InventoryPlaceholder handleAddInventory={open} theme={InventoryPlaceholderTheme.EMPTY_INVENTORY} />
					)}
				</Container>
			</section>
			<AddInventoryModal isOpen={isOpen} onClose={close} />
		</>
	);
};

export default InventoryPage;
