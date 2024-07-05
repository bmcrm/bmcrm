import { memo } from 'react';
import styles from './InventoryPage.module.scss';
import Button from 'shared/ui/Button/Button';
import { ButtonColor, ButtonTheme } from 'shared/ui/Button/Button.types';
import { InventoryCategories } from '../InventoryCategories/InventoryCategories';
import { inventoryMockData } from './inventoryMockData';
const InventoryPage = memo(() => {
  const categoriesFromMock = [...new Set(inventoryMockData.map(item => item.category))];
  console.log(categoriesFromMock);
  return (
    <section className={styles.inventory}>
      <div className={styles.top_options_btns}>
        <Button theme={ButtonTheme.OUTLINE} color={ButtonColor.RUBY}>
          Add category
        </Button>
        <Button>Add inventory</Button>
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
    </section>
  );
});

export default InventoryPage;
