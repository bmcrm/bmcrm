import { memo } from 'react';
import styles from './InventoryPage.module.scss';
import { Button } from '@shared/ui/Button';
import { useToggle } from '@shared/hooks/useToggle';
import { InventoryCategories } from '@entities/Inventory/ui/InventoryCategories/InventoryCategories';
import { Container } from '@shared/ui/Container';
import { FormLoader } from '@features/FormLoader';
import { ToTopButton } from '@widgets/ToTopButton';
import { useGetInventory } from '@entities/Inventory';
import { InventoryEmpty } from '../InventoryEmpty/InventoryEmpty';
import { AddInventoryModal } from '@features/AddInventoryModal';

const InventoryPage = memo(() => {
	const { data: inventory, isLoading } = useGetInventory();
	const { isOpen, open, close } = useToggle();

	const categoriesFromInventory = [...new Set(inventory?.map(item => item.category))];

	if (isLoading && !inventory?.length) return <FormLoader />;

	return (
		<section className={styles.inventory}>
			{/*<ToTopButton/>*/}
			<Container className={styles.inventory__container} fluid>

				{categoriesFromInventory.length > 0 && (
					<div className={styles.top_options_btns}>
						<Button onClick={open}>Add inventory</Button>
					</div>
				)}

				{categoriesFromInventory.length > 0 ? (
					<div className={styles.categories}>
						{categoriesFromInventory.map(category => (
							<InventoryCategories
								key={category}
								title={category}
								items={inventory?.filter(item => item?.category === category)}
							/>
						))}
					</div>
				) : (
					<InventoryEmpty handleAddInventory={open} />
				)}

				{isOpen && <AddInventoryModal isOpen={isOpen} onClose={close} />}

			</Container>
		</section>
	);
});

export default InventoryPage;
