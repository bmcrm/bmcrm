import { memo, useCallback, useState } from 'react';
import { classNames } from '@shared/lib/classNames';
import { useToggle } from '@shared/hooks/useToggle';
import { Image } from '@shared/ui/Image';
import { InventoryBadge } from '@shared/ui/InventoryBadge';
import { Button, ButtonSize, ButtonTheme } from '@shared/ui/Button';
import { Icon, IconSize } from '@shared/ui/Icon';
import { ConfirmModalTemplate } from '@features/ConfirmModalTemplate';
import { InventoryDetailsModal, InventoryDetailsModalTheme } from '@widgets/InventoryDetailsModal';
import { useDeleteInventoryItem, useGetInventory, type IInventoryItem } from '@entities/Inventory';
import { MODAL_ANIMATION_DELAY } from '@shared/const/animations';
import { userState } from '@entities/User';
import { CamperRole } from '@entities/Camper';
import styles from './InventoryCard.module.scss';
import DeleteImg from '@shared/assets/images/inventory/confirm-delete.png';
import DefaultImg from '@shared/assets/images/inventory/no-img.webp';
import DeleteIcon from '@shared/assets/icons/delete.svg';
import EditIcon from '@shared/assets/icons/edit_icon.svg';

type InventoryCardProps = {
	className?: string;
	item: IInventoryItem;
};

const InventoryCard = memo(({ className, item }: InventoryCardProps) => {
	const { id, title, description, quantity, price, category, images } = item;
	const imgURL = images?.[0] || DefaultImg;
	const { isOpen, open, close } = useToggle();
	const { isOpen: isConfirmOpen, open: confirmOpen, close: confirmClose } = useToggle();
	const [modalTheme, setModalTheme] = useState<InventoryDetailsModalTheme>(InventoryDetailsModalTheme.DEFAULT);
	const { data: inventory } = useGetInventory();
	const { mutate: deleteItem } = useDeleteInventoryItem();
	const { tokens: { decodedIDToken } } = userState();
	const canControl = decodedIDToken?.role === CamperRole.TCO || decodedIDToken?.role === CamperRole.COORG;

	const handleDelete = useCallback(async () => {
		const itemsInCategory = inventory?.filter(item => item.category === category);
		const isLastItem = itemsInCategory?.length === 1;

		try {
			await new Promise<void>((resolve) => {
				confirmClose();
				close();
				setTimeout(resolve, MODAL_ANIMATION_DELAY + 100);
			});

			deleteItem({
				itemID: id,
				category,
				...(isLastItem ? { lastItem: isLastItem } : {}),
			});
		} catch {
			return;
		}
  }, [category, close, confirmClose, deleteItem, id, inventory]);

	const handleOpenModal = useCallback(
		(theme: InventoryDetailsModalTheme) => {
			setModalTheme(theme);
			open();
		},
		[open]
	);

	return (
		<>
			<li
				className={classNames(styles.card, {}, [className])}
				onClick={() => handleOpenModal(InventoryDetailsModalTheme.DEFAULT)}
			>
				<div className={styles.card__head}>
					<Image
						src={imgURL}
						alt={title}
						className={classNames(styles.card__img, { [styles.contain]: !images?.[0] }, [])}
					/>
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
					{canControl && (
						<div className={styles.card__control}>
							<Button
								aria-label={'Edit item button'}
								theme={ButtonTheme.CLEAR}
								size={ButtonSize.TEXT}
								className={styles.card__btn}
								onClick={(e) => {
									e.stopPropagation();
									handleOpenModal(InventoryDetailsModalTheme.EDIT);
								}}
							>
								<Icon icon={<EditIcon />} size={IconSize.SIZE_14} />
							</Button>
							<Button
								aria-label={'Delete item button'}
								theme={ButtonTheme.CLEAR}
								size={ButtonSize.TEXT}
								className={styles.card__btn}
								onClick={(e) => {
									e.stopPropagation();
									confirmOpen();
								}}
							>
								<Icon icon={<DeleteIcon />} size={IconSize.SIZE_14}/>
							</Button>
						</div>
					)}
				</div>
			</li>
			<InventoryDetailsModal
				isOpen={isOpen}
				onClose={close}
				item={item}
				handleDelete={confirmOpen}
				theme={modalTheme}
			/>
			<ConfirmModalTemplate
				isOpen={isConfirmOpen}
				onClose={confirmClose}
				title={<>Are you sure you want to delete the item "{title}"?</>}
				imgSrc={DeleteImg}
				btnLabel={'YES, DELETE'}
				handler={handleDelete}
			/>
		</>
	);
});

export default InventoryCard;