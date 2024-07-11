import { IInventoryItem } from 'entities/Inventory/model/types/types';
import styles from './InventoryDetailsModal.module.css';
import { useState } from 'react';
import Icon from 'shared/ui/Icon/Icon';
import EditIcon from 'shared/assets/icons/edit_icon.svg';
import DeleteIcon from 'shared/assets/icons/delete.svg';
import { IconSize } from 'shared/ui/Icon/Icon.types';
import useInventory from 'entities/Inventory/model/services/useInventory/useInventory';
interface InventoryDetailsModalProps {
  item: IInventoryItem;
  onClose: () => void;
}
export const InventoryDetailsModal = ({ item, onClose }: InventoryDetailsModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { deleteItem } = useInventory();

  if (!item) {
    return null;
  }
  return (
    <section className={styles.inventoryDetailsModal}>
      <div>
        <div className={styles.imgWrapper}>
          <img src={item?.images![currentImageIndex]} alt='inventory image' />
        </div>
        <div className={styles.imgGallery}>
          {item?.images?.map((image, index) => (
            <img src={image} alt='inventory image' key={image} onClick={() => setCurrentImageIndex(index)} />
          ))}
        </div>
      </div>
      <div className={styles.itemInfo}>
        <p className={styles.title}>
          <span>{item?.title}</span> <Icon icon={<EditIcon />} size={IconSize.SIZE_24} />
        </p>
        <p>{item?.description}</p>
        <div className={styles.countInfo}>
          <p className={styles.badge}>{item?.quantity} quantity</p>
          <p className={styles.badge}>${item?.price} price 1pc</p>
          <p className={styles.badge}>${item?.quantity * item?.price} total price</p>
        </div>
        <div className={styles.actions}>
          <button onClick={() => deleteItem(item?.id)}>
            <Icon icon={<DeleteIcon />} size={IconSize.SIZE_24} />
          </button>
        </div>
      </div>
    </section>
  );
};
