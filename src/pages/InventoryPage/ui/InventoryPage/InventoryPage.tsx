import { memo, useState } from 'react';
import styles from './InventoryPage.module.scss';
import Button from 'shared/ui/Button/Button';
import { ButtonColor, ButtonTheme } from 'shared/ui/Button/Button.types';
import { InventoryCategories } from '../InventoryCategories/InventoryCategories';
import { inventoryMockData } from './inventoryMockData';
import { useToggle } from 'shared/hooks/useToggle/useToggle';
import Modal from 'shared/ui/Modal/Modal';
import AddCategoryForm from '../AddCategoryForm/AddCategoryForm';
import AddInventoryForm from '../AddInventoryForm/AddInventoryForm';
const InventoryPage = memo(() => {
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

  const categoriesFromMock = [...new Set(inventoryMockData.map(item => item.category))];
  return (
    <section className={styles.inventory}>
      <div className={styles.top_options_btns}>
        <Button onClick={handleOpenAddCategory} theme={ButtonTheme.OUTLINE} color={ButtonColor.RUBY}>
          Add category
        </Button>
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
        {typeModal === 'addCategory' ? <AddCategoryForm onClose={toggle} /> : <AddInventoryForm onClose={toggle} />}
      </Modal>
    </section>
  );
});

export default InventoryPage;
