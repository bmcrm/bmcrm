import { memo, useEffect } from 'react';
import styles from './InventoryPage.module.scss';
import Button from 'shared/ui/Button/Button';
import { useToggle } from 'shared/hooks/useToggle/useToggle';
import Modal from 'shared/ui/Modal/Modal';
import useInventory from 'entities/Inventory/model/services/useInventory/useInventory';
import { InventoryCategories } from 'entities/Inventory/ui/InventoryCategories/InventoryCategories';
import AddInventoryForm from 'entities/Inventory/ui/AddInventoryForm/AddInventoryForm';
import Container from 'shared/ui/Container/Container';

const InventoryPage = memo(() => {
  const { getItems, inventory } = useInventory();
  useEffect(() => {
    getItems();
  }, [getItems]);

  const { toggle, isOpen } = useToggle();

  const handleOpenAddInventory = () => {
    toggle();
  };

  const categoriesFromInventory = [...new Set(inventory.map(item => item.category))];
  return (
    <section className={styles.inventory}>
      <Container fluid>
        <div className={styles.top_options_btns}>
          <Button onClick={handleOpenAddInventory}>Add inventory</Button>
        </div>
        <div className={styles.categories}>
          {categoriesFromInventory.map(category => (
            <InventoryCategories
              key={category}
              title={category}
              items={inventory.filter(item => item.category === category)}
            />
          ))}
        </div>
        <Modal isOpen={isOpen} onClose={toggle}>
          <AddInventoryForm onClose={toggle} />
        </Modal>
      </Container>
    </section>
  );
});

export default InventoryPage;
