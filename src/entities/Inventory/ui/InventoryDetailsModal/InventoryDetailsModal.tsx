import { IInventoryItem } from 'entities/Inventory/model/types/types';
import styles from './InventoryDetailsModal.module.scss';
import { useState } from 'react';
import Icon from 'shared/ui/Icon/Icon';
import DeleteIcon from 'shared/assets/icons/delete.svg';
import { IconSize } from 'shared/ui/Icon/Icon.types';
import useInventory from 'entities/Inventory/model/services/useInventory/useInventory';
import { Swiper, SwiperSlide } from 'swiper/react';
interface InventoryDetailsModalProps {
  item: IInventoryItem;
  onClose?: () => void;
}
export const InventoryDetailsModal = ({ item }: InventoryDetailsModalProps) => {
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
          <div className={styles.scroll}>
            <Swiper grabCursor={true} className={styles.swiper} spaceBetween={10} slidesPerView={3}>
              {item?.images?.map((image, index) => (
                <SwiperSlide key={image}>
                  <img src={image} alt='inventory image' key={image} onClick={() => setCurrentImageIndex(index)} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
      <div className={styles.itemInfo}>
        <p className={styles.title}>
          <span>{item?.title}</span>
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
