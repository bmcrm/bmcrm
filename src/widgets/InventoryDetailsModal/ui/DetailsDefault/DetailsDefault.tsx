import { memo } from 'react';
import { classNames } from '@shared/lib/classNames';
import { useMedia } from '@shared/hooks/useMedia';
import { Button, ButtonSize, ButtonTheme } from '@shared/ui/Button';
import { Icon, IconSize } from '@shared/ui/Icon';
import { InventoryBadge } from '@shared/ui/InventoryBadge';
import { InventorySlider } from '@widgets/InventorySlider';
import type { IInventoryItem } from '@entities/Inventory';
import styles from './DetailsDefault.module.scss';
// import EditIcon from '@shared/assets/icons/edit_icon.svg';
import DeleteIcon from '@shared/assets/icons/delete.svg';

type DetailsDefaultProps = {
	className?: string;
	item: IInventoryItem;
	handleDelete: () => void;
};

const DetailsDefault = memo((props: DetailsDefaultProps) => {
	const { className, handleDelete, item: { images, title, description, quantity, price } } = props;
	const { isMobile } = useMedia();

	return (
		<div className={classNames(styles.details, {}, [className])}>
			{images && images.length > 0 && (
				<InventorySlider
					images={images}
					customStyles={{ maxWidth: isMobile ? '100%' : '45%' }}
				/>
			)}
			<div className={styles.details__content}>
				<div className={styles.details__heading}>
					<h2>{title}</h2>
					{/*<Button*/}
					{/*	theme={ButtonTheme.CLEAR}*/}
					{/*	size={ButtonSize.TEXT}*/}
					{/*>*/}
					{/*	<Icon icon={<EditIcon />} size={IconSize.SIZE_24} style={{ color: 'var(--color-neutral)' }} />*/}
					{/*</Button>*/}
				</div>
				<p className={styles.details__desc}>{description}</p>
				<div className={styles.details__badges}>
					<InventoryBadge label={<><span style={{ font: 'var(--font-m)' }}>{quantity}</span> quantity</>} />
					<InventoryBadge label={<><span style={{ font: 'var(--font-m)' }}>${price}</span> price 1pc</>} />
					<InventoryBadge label={<><span style={{ font: 'var(--font-m)' }}>${+price * +quantity}</span> total price</>} />
				</div>
				<Button
					theme={ButtonTheme.CLEAR}
					size={ButtonSize.TEXT}
					className={styles.details__btn}
					onClick={handleDelete}
				>
					<Icon icon={<DeleteIcon />} size={IconSize.SIZE_24}/>
				</Button>
			</div>
		</div>
	);
});

export { DetailsDefault };