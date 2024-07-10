import clsx from 'clsx';
import styles from './InventoryCard.module.scss';
import Inventory from 'shared/assets/images/inventory/inventory.png';
import useInventory from 'entities/Inventory/model/services/useInventory/useInventory';
import { IInventoryItem } from 'entities/Inventory/model/types/types';

interface InventoryCardProps {
  handleOpenEditInventory: (id: string) => void;
  item: IInventoryItem;
}
export const InventoryCard = ({ item, handleOpenEditInventory }: InventoryCardProps) => {
  const { title, description, quantity, price, id, images } = item;
  const { deleteItem } = useInventory();

  return (
    <li className={styles.card}>
      <div className={styles.image}>
        <img src={images?.length ? images[0] : Inventory} alt='inventory image' />
      </div>

      <section>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <div className={styles.info}>
          <p className={clsx(styles.info__quantity, styles.badge)}>{quantity} quantity</p>
          <p className={clsx(styles.info__price, styles.badge)}>${price} price 1pc</p>
        </div>
        <p className={clsx(styles.info__totalPrice, styles.badge)}>${quantity * price} total price</p>
        <div className={styles.actions}>
          <button onClick={() => handleOpenEditInventory(id!)}>Edit</button>
          <button onClick={() => deleteItem(id!)}>Remove</button>
        </div>
      </section>
    </li>
  );
};
