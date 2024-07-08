import { memo, useEffect, useState } from 'react';
import styles from './InventoryPage.module.scss';
import Button from 'shared/ui/Button/Button';
import { ButtonColor, ButtonTheme } from 'shared/ui/Button/Button.types';
import { InventoryCategories } from 'entities/Inventory/ui/InventoryCategories/InventoryCategories';
import { useToggle } from 'shared/hooks/useToggle/useToggle';
import Modal from 'shared/ui/Modal/Modal';
import AddCategoryForm from 'entities/Inventory/ui/AddCategoryForm/AddCategoryForm';
import AddInventoryForm from 'entities/Inventory/ui/AddInventoryForm/AddInventoryForm';
import useInventory from 'entities/Inventory/model/services/useInventory/useInventory';
const InventoryPage = memo(() => {
  const { getItems, inventory } = useInventory();
  useEffect(() => {
    getItems();
  }, [getItems]);

  const { toggle, isOpen } = useToggle();
  const [typeModal, setTypeModal] = useState('');
  const handleOpenAddCategory = () => {
    toggle();
    setTypeModal('addCategory');
  };
  const handleOpenAddInventory = () => {
    toggle();
    setTypeModal('addInventory');
  };

  const categoriesFromInventory = [...new Set(inventory.map(item => item.category))];
  return (
    <section className={styles.inventory}>
      {categoriesFromInventory.length > 0 && (
        <div className={styles.top_options_btns}>
          <Button disabled onClick={handleOpenAddCategory} theme={ButtonTheme.OUTLINE} color={ButtonColor.RUBY}>
            Add category
          </Button>
          <Button onClick={handleOpenAddInventory}>Add inventory</Button>
        </div>
      )}
      {categoriesFromInventory.length ? (
        <div className={styles.categories}>
          {categoriesFromInventory.map(category => (
            <InventoryCategories
              key={category}
              title={category}
              items={inventory.filter(item => item.category === category)}
            />
          ))}
        </div>
      ) : (
        <div className={styles.no_items}>
          <img
            src='https://cdni.iconscout.com/illustration/premium/thumb/sorry-item-not-found-3328225-2809510.png'
            alt='no data'
          />
          <h2>Inventory is empty...</h2>
          <Button onClick={handleOpenAddInventory}>Add!</Button>
        </div>
      )}
      {isOpen && (
        <Modal isOpen={isOpen} onClose={toggle}>
          {typeModal === 'addCategory' ? <AddCategoryForm onClose={toggle} /> : <AddInventoryForm onClose={toggle} />}
        </Modal>
      )}
    </section>
  );
});

export default InventoryPage;
