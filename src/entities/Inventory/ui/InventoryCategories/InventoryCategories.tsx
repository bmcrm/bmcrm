import { InventoryCard } from '../InventoryCard/InventoryCard';

import { IInventoryItem } from '../../model/types/types';
import styles from './InventoryCategories.module.scss';
import clsx from 'clsx';
import { useToggle } from 'shared/hooks/useToggle/useToggle';
import Modal from 'shared/ui/Modal/Modal';
import EditInventoryForm from '../EditInventoryForm/EditInventoryForm';
import { useState } from 'react';

interface InventoryCategoriesProps {
  title: string;
  items: IInventoryItem[];
}
export const InventoryCategories = ({ title, items = [] }: InventoryCategoriesProps) => {
  const { toggle, isOpen } = useToggle();
  const [editedItemId, setEditedItemId] = useState('');
  const handleOpenEditInventory = (id: string) => {
    toggle();
    setEditedItemId(id);
  };
  return (
    <section className={styles.inventoryCategories}>
      <h2 className={styles.title}>{title}</h2>
      <div className={clsx(items.length <= 4 ? styles.templateGridNormal : styles.cards)}>
        {items?.map(item => (
          <InventoryCard handleOpenEditInventory={handleOpenEditInventory} key={item.id} item={item} />
        ))}
      </div>
      {isOpen && (
        <Modal isOpen={isOpen} onClose={toggle}>
          <EditInventoryForm itemId={editedItemId} onClose={toggle} />
        </Modal>
      )}
    </section>
  );
};
