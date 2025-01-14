import { memo } from 'react';
import { classNames } from '@shared/lib/classNames';
import { useMedia } from '@shared/hooks/useMedia';
import { Button, ButtonSize, ButtonTheme } from '@shared/ui/Button';
import { Icon, IconSize } from '@shared/ui/Icon';
import { InventoryBadge } from '@shared/ui/InventoryBadge';
import { InventorySlider } from '@widgets/InventorySlider';
import type { IInventoryItem } from '@entities/Inventory';
import styles from './DetailsDefault.module.scss';
import EditIcon from '@shared/assets/icons/edit_icon.svg';
import DeleteIcon from '@shared/assets/icons/delete.svg';

type DetailsDefaultProps = {
	className?: string;
	item: IInventoryItem;
	handleDelete: () => void;
	onEdit: () => void;
};

const DetailsDefault = memo((props: DetailsDefaultProps) => {
	const { className, handleDelete, onEdit, item: { images, title, description, quantity, price, category } } = props;
	const { isMobile } = useMedia();

	return (
		<div className={classNames(styles.details, {}, [className])}>
			{images && images.length > 0 && (
				<InventorySlider currentImages={images} customStyles={{ maxWidth: isMobile ? '100%' : '55%' }} />
			)}
			<div className={styles.details__content}>
				<h2 className={styles.details__title}>{title}</h2>
				<p className={styles.details__desc}>{description}</p>
				<div className={styles.details__badges}>
					<InventoryBadge label={<>quantity: <span style={{ font: 'var(--font-m)' }}>{quantity}</span></>} />
					<InventoryBadge label={<>price 1pc: <span style={{ font: 'var(--font-m)' }}>${price}</span></>} />
					<InventoryBadge label={<>total price: <span style={{ font: 'var(--font-m)' }}>${+price * +quantity}</span></>} />
					<InventoryBadge label={<>category: <span style={{ font: 'var(--font-m)' }}>{category}</span></>} />
				</div>
				<div className={styles.details__control}>
					<Button
						theme={ButtonTheme.CLEAR}
						size={ButtonSize.TEXT}
						className={styles.details__btn}
						onClick={onEdit}
					>
						<Icon icon={<EditIcon />} size={IconSize.SIZE_24} />
					</Button>
					<Button
						theme={ButtonTheme.CLEAR}
						size={ButtonSize.TEXT}
						className={styles.details__btn}
						onClick={handleDelete}
					>
						<Icon icon={<DeleteIcon />} size={IconSize.SIZE_24} />
					</Button>
				</div>
			</div>
		</div>
	);
});

export { DetailsDefault };