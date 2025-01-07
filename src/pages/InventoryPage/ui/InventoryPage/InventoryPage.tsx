import { memo } from 'react';
import { useToggle } from '@shared/hooks/useToggle';
import { Container } from '@shared/ui/Container';
import { Button } from '@shared/ui/Button';
import { FormLoader } from '@features/FormLoader';
import { InventoryEmpty } from '../InventoryEmpty/InventoryEmpty';
import { AddInventoryModal } from '@features/AddInventoryModal';
import { InventoryNav } from '../InventoryNav/InventoryNav';
import { InventoryCategory } from '../InventoryCategory/InventoryCategory';
import { useGetCategories, useGetInventory } from '@entities/Inventory';
import styles from './InventoryPage.module.scss';

const InventoryPage = memo(() => {
	const { data: categories, isLoading: categoriesIsLoading } = useGetCategories();
	const { data: inventory, isLoading: inventoryIsLoading } = useGetInventory();
	const { isOpen, open, close } = useToggle();
	const isLoading = inventoryIsLoading || categoriesIsLoading;

	console.log('categories:', categories);
	console.log('inventory:', inventory);

	if (isLoading && !categories?.length) return <FormLoader />;

	return (
		<>
			<section className={styles.inventory}>
				<Container className={styles.inventory__container} fluid>
					{categories && categories.length > 0 && inventory && inventory.length > 0 && (
						<>
							<InventoryNav categories={categories} />
							<Button onClick={open} className={'ml-a mt-30'}>Add inventory</Button>
							<div className={styles.inventory__categories}>
								{categories.map(category => (
									<InventoryCategory
										key={category}
										category={category}
										items={inventory.filter(item => item?.category === category)}
									/>
								))}
							</div>
						</>
					)}
					{!categories?.length && !inventory?.length && <InventoryEmpty handleAddInventory={open} />}
				</Container>
			</section>
			<AddInventoryModal isOpen={isOpen} onClose={close} />
		</>
	);
});

export default InventoryPage;
