import { memo } from 'react';
import styles from './InventoryPage.module.scss';
import Button from 'shared/ui/Button/Button';
import { InventoryCategories } from '../InventoryCategories/InventoryCategories';
import { inventoryMockData } from './inventoryMockData';
import { useToggle } from 'shared/hooks/useToggle/useToggle';
import Modal from 'shared/ui/Modal/Modal';
import AddInventoryForm from '../AddInventoryForm/AddInventoryForm';
const InventoryPage = memo(() => {
  const { toggle, isOpen } = useToggle();

  const handleOpenAddInventory = () => {
    toggle();
  };

  const categoriesFromMock = [...new Set(inventoryMockData.map(item => item.category))];
  return (
    <section className={styles.inventory}>
      <div className={styles.top_options_btns}>
        <Button onClick={handleOpenAddInventory}>Add inventory</Button>
      </div>
      <div className={styles.categories}>
        {categoriesFromMock.map(category => (
          <InventoryCategories
            key={category}
            title={category}
            items={inventoryMockData.filter(item => item.category === category)}
          />
        ))}
      </div>
      <Modal isOpen={isOpen} onClose={toggle}>
        <AddInventoryForm onClose={toggle} />
      </Modal>
    </section>
  );
});

export default InventoryPage;
