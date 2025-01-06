import { memo } from 'react';
import { classNames } from '@shared/lib/classNames';
import { Image } from '@shared/ui/Image';
import { Button } from '@shared/ui/Button';
import styles from './InventoryEmpty.module.scss';
import NotFoundImg from '@shared/assets/images/inventory/notFound.png';

type InventoryEmptyProps = {
	className?: string;
	handleAddInventory: () => void;
};

const InventoryEmpty = memo(({ className, handleAddInventory }: InventoryEmptyProps) => (
	<div className={classNames(styles.empty, {}, [className])}>
		<Image src={NotFoundImg} alt={'Empty inventory'}/>
		<h2>Inventory is empty...</h2>
		<Button onClick={handleAddInventory}>Add!</Button>
	</div>
));

export { InventoryEmpty };