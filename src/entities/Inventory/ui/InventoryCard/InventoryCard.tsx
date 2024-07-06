import clsx from 'clsx';
import styles from './InventoryCard.module.scss';
import Inventory from 'shared/assets/images/inventory/inventory.png';
interface InventoryCardProps {
  title: string;
  description: string;
  quantity: number;
  price: number;
  totalPrice: number;
}
export const InventoryCard = ({ title, description, quantity, price, totalPrice }: InventoryCardProps) => {
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
        <p className={clsx(styles.info__totalPrice, styles.badge)}>${totalPrice} total price</p>
        <div className={styles.actions}>
          <button>Copy</button>
          <button>Remove</button>
        </div>
      </section>
    </li>
  );
};
