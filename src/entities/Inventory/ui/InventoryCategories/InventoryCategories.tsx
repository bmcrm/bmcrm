import { InventoryCard } from '../InventoryCard/InventoryCard';

import { IInventoryItem } from '../../model/types/types';
import styles from './InventoryCategories.module.scss';
import clsx from 'clsx';
import { useToggle } from '@shared/hooks/useToggle';
import { Modal } from '@shared/ui/Modal';
import EditInventoryForm from '../EditInventoryForm/EditInventoryForm';
import { useState } from 'react';
import { InventoryDetailsModal } from '../InventoryDetailsModal/InventoryDetailsModal';

interface InventoryCategoriesProps {
  title: string;
  items: IInventoryItem[];
}
export const InventoryCategories = ({ title, items = [] }: InventoryCategoriesProps) => {
  const { toggle, isOpen } = useToggle();
  const { toggle: toggleView, isOpen: isOpenView } = useToggle();
  const [editedItemId, setEditedItemId] = useState('');
  const [viewItem, setViewItem] = useState<IInventoryItem>();
  const handleOpenEditInventory = (id: string) => {
    toggle();
    setEditedItemId(id);
  };
  const handleOpenView = (item: IInventoryItem) => {
    toggleView();
    setViewItem(item);
  };
  return (
    <section className={styles.inventoryCategories}>
      <h2 className={styles.title}>{title}</h2>
      <div className={clsx(items.length <= 4 ? styles.templateGridNormal : styles.cards)}>
        {items?.map(item => (
          <InventoryCard
            showInfo={() => handleOpenView(item)}
            handleOpenEditInventory={handleOpenEditInventory}
            key={item.id}
            item={item}
          />
        ))}
      </div>
      {isOpen && (
        <Modal isOpen={isOpen} onClose={toggle}>
          <EditInventoryForm itemId={editedItemId} onClose={toggle} />
        </Modal>
      )}

      {isOpenView && viewItem && (
        <Modal isOpen={isOpenView} onClose={toggleView}>
          <InventoryDetailsModal onClose={toggleView} item={viewItem} />
        </Modal>
      )}
    </section>
  );
};
