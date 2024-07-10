import { memo, useEffect } from 'react';
import styles from './InventoryPage.module.scss';
import Button from 'shared/ui/Button/Button';
import { useToggle } from 'shared/hooks/useToggle/useToggle';
import Modal from 'shared/ui/Modal/Modal';
import useInventory from 'entities/Inventory/model/services/useInventory/useInventory';
import { InventoryCategories } from 'entities/Inventory/ui/InventoryCategories/InventoryCategories';
import AddInventoryForm from 'entities/Inventory/ui/AddInventoryForm/AddInventoryForm';
import Container from 'shared/ui/Container/Container';
import NotFound from 'shared/assets/images/inventory/notFound.png';
import FormLoader from 'features/FormLoader';
const InventoryPage = memo(() => {
  const { getItems, inventory, isLoading } = useInventory(state => ({
    getItems: state.getItems,
    inventory: state.inventory,
    isLoading: state.isLoading,
  }));
  useEffect(() => {
    getItems();
  }, [getItems]);

  const { toggle, isOpen } = useToggle();

  const handleOpenAddInventory = () => {
    toggle();
  };

  const categoriesFromInventory = [...new Set(inventory?.map(item => item.category))];
  if (isLoading && !inventory.length) return <FormLoader />;
  return (
    <section className={styles.inventory}>
      <Container fluid>
        {categoriesFromInventory.length ? (
          <div className={styles.top_options_btns}>
            <Button onClick={handleOpenAddInventory}>Add inventory</Button>
          </div>
        ) : null}
        <div className={styles.categories}>
          {categoriesFromInventory.length ? (
            categoriesFromInventory.map(category => (
              <InventoryCategories
                key={category}
                title={category}
                items={inventory.filter(item => item?.category === category)}
              />
            ))
          ) : (
            <div className={styles.no_items}>
              <img src={NotFound} alt='no data' />
              <h2>Inventory is empty...</h2>
              <Button onClick={handleOpenAddInventory}>Add!</Button>
            </div>
          )}
        </div>
        {isOpen && (
          <Modal isOpen={isOpen} onClose={toggle}>
            <AddInventoryForm onClose={toggle} />
          </Modal>
        )}
      </Container>
    </section>
  );
});

export default InventoryPage;
