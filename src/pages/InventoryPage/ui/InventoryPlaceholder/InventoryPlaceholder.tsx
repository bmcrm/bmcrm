import { memo } from 'react';
import { classNames } from '@shared/lib/classNames';
import { Image } from '@shared/ui/Image';
import { Button } from '@shared/ui/Button';
import { InventoryPlaceholderTheme } from '../../model/types/InventoryPlaceholder.types';
import styles from './InventoryPlaceholder.module.scss';
import NotFoundImg from '@shared/assets/images/inventory/notFound.png';
import InvalidCategoryImg from '@shared/assets/images/inventory/inventory.png';

type InventoryPlaceholderProps = {
	className?: string;
	theme: InventoryPlaceholderTheme,
	handleAddInventory?: () => void;
};

const InventoryPlaceholder = memo((props: InventoryPlaceholderProps) => {
	const { className, theme, handleAddInventory } = props;

	const data = {
		[InventoryPlaceholderTheme.EMPTY_INVENTORY]: {
			image: NotFoundImg,
			alt: 'Empty inventory',
			title: 'Inventory is empty...',
			button: <Button onClick={handleAddInventory}>Add!</Button>,
		},
		[InventoryPlaceholderTheme.INVALID_CATEGORY]: {
			image: InvalidCategoryImg,
			alt: 'Invalid category',
			title: 'There is no such category.',
			button: null,
		},
	};

	return (
		<div className={classNames(styles.empty, {}, [className])}>
			<Image src={data[theme].image} alt={data[theme].alt}/>
			<h2>{data[theme].title}</h2>
			{data[theme].button}
		</div>
	);
});

export { InventoryPlaceholder };