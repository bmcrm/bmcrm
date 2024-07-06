import { InventoryCard } from '../InventoryCard/InventoryCard';

import { IInventoryItem } from '../InventoryPage/types';
import styles from './InventoryCategories.module.scss';

interface InventoryCategoriesProps {
  title: string;
  items: IInventoryItem[];
}
export const InventoryCategories = ({ title, items }: InventoryCategoriesProps) => {
  return (
    <section className={styles.inventoryCategories}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.cards}>
        {items.map(item => (
          <InventoryCard key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
};
