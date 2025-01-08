import { memo, useCallback } from 'react';
import { classNames } from '@shared/lib/classNames';
import { useToggle } from '@shared/hooks/useToggle';
import { Image } from '@shared/ui/Image';
import { InventoryBadge } from '@shared/ui/InventoryBadge';
import { Button, ButtonSize, ButtonTheme } from '@shared/ui/Button';
import { Icon, IconSize } from '@shared/ui/Icon';
import { InventoryDetailsModal } from '@widgets/InventoryDetailsModal';
import { useDeleteInventoryItem, useGetInventory, type IInventoryItem } from '@entities/Inventory';
import styles from './InventoryCard.module.scss';
import DefaultImg from '@shared/assets/images/inventory/no-img.webp';
import DeleteIcon from '@shared/assets/icons/delete.svg';

type InventoryCardProps = {
	className?: string;
	item: IInventoryItem;
};

const InventoryCard = memo(({ className, item }: InventoryCardProps) => {
	const { id, title, description, quantity, price, category, images } = item;
	const imgURL = images?.[0] || DefaultImg;
	const { data: inventory } = useGetInventory();
	const { mutate: deleteItem } = useDeleteInventoryItem();
	const { isOpen, open, close } = useToggle();

	const handleDelete = useCallback(() => {
		const itemsInCategory = inventory?.filter(item => item.category === category);
		const isLastItem = itemsInCategory?.length === 1;

		deleteItem({ itemID: id, lastItem: isLastItem, category: isLastItem ? category : undefined });
  }, [category, deleteItem, id, inventory]);

	return (
		<>
			<li className={classNames(styles.card, {}, [className])} onClick={open}>
				<div className={styles.card__head}>
					<Image src={imgURL} alt={title}
					       className={classNames(styles.card__img, { [styles.contain]: !images?.[0] }, [])}/>
				</div>
				<div className={styles.card__body}>
					<h3 className={styles.card__title}>{title}</h3>
					<p className={styles.card__desc}>{description}</p>
					<div className={styles.card__badges}>
						<InventoryBadge label={<><span style={{ font: 'var(--font-s)' }}>{quantity}</span> quantity</>}/>
						<InventoryBadge label={<><span style={{ font: 'var(--font-s)' }}>${price}</span> price 1pc</>}/>
						<InventoryBadge
							label={<><span style={{ font: 'var(--font-s)' }}>${+quantity * +price}</span> total price</>}/>
					</div>
					<div className={styles.card__control}>
						<Button
							theme={ButtonTheme.CLEAR}
							size={ButtonSize.TEXT}
							className={styles.card__btn}
							onClick={(e) => {
								e.stopPropagation();
								handleDelete();
							}}
						>
							<Icon icon={<DeleteIcon/>} size={IconSize.SIZE_14}/>
						</Button>
					</div>
				</div>
			</li>
			<InventoryDetailsModal isOpen={isOpen} onClose={close} item={item} handleDelete={handleDelete} />
		</>
	);
});

export default InventoryCard;