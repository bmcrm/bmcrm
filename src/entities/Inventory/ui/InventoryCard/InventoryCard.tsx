import clsx from 'clsx';
import styles from './InventoryCard.module.scss';
import Inventory from 'shared/assets/images/inventory/inventory.png';
import useInventory from 'entities/Inventory/model/services/useInventory/useInventory';
interface InventoryCardProps {
  title: string;
  description: string;
  quantity: number;
  price: number;
}
export const InventoryCard = ({ id, title, description, quantity, price }: InventoryCardProps) => {
  const { deleteItem } = useInventory();
  return (
    <li className={styles.card}>
      <img src={Inventory} alt='inventory image' />
      <section>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <div className={styles.info}>
          <p className={clsx(styles.info__quantity, styles.badge)}>{quantity} quantity</p>
          <p className={clsx(styles.info__price, styles.badge)}>${price} price 1pc</p>
        </div>
        <p className={clsx(styles.info__totalPrice, styles.badge)}>${quantity * price} total price</p>
        <div className={styles.actions}>
          <button>Copy</button>
          <button onClick={() => deleteItem(id)}>Remove</button>
        </div>
      </section>
    </li>
  );
};
