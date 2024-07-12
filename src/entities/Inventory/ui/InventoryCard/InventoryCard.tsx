import clsx from 'clsx';
import styles from './InventoryCard.module.scss';
import Inventory from 'shared/assets/images/inventory/inventory.png';
import useInventory from 'entities/Inventory/model/services/useInventory/useInventory';
import { IInventoryItem } from 'entities/Inventory/model/types/types';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-cube';

import 'swiper/css/effect-creative';
import { EffectCreative } from 'swiper/modules';
interface InventoryCardProps {
  handleOpenEditInventory: (id: string) => void;
  item: IInventoryItem;
  showInfo?: (item: IInventoryItem) => void;
}
export const InventoryCard = ({ item, showInfo, handleOpenEditInventory }: InventoryCardProps) => {
  const { title, description, quantity, price, id, images } = item;
  const { deleteItem } = useInventory();

  return (
    <li className={styles.card}>
      {item.images?.length ? (
        <Swiper
          grabCursor={true}
          effect={'creative'}
          creativeEffect={{
            prev: {
              shadow: true,
              translate: [0, 0, -400],
            },
            next: {
              translate: ['100%', 0, 0],
            },
          }}
          modules={[EffectCreative]}
          className={styles.swiper}
          spaceBetween={10}
          slidesPerView={2}
        >
          {images?.map(image => (
            <SwiperSlide key={image}>
              <img src={image} alt='inventory image' onClick={() => showInfo?.(item)} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className={styles.image}>
          <img onClick={() => showInfo?.(item)} src={Inventory} alt='inventory image' />
        </div>
      )}

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
