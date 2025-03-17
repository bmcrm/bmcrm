import { memo } from 'react';
import { classNames } from '@shared/lib/classNames';
import { Image } from '@shared/ui/Image';
import { Button } from '@shared/ui/Button';
import { InventoryPlaceholderTheme } from '../../model/types/InventoryPlaceholder.types';
import styles from './InventoryPlaceholder.module.scss';
import NotFoundImg from '@shared/assets/images/inventory/not-found.png';
import InvalidCategoryImg from '@shared/assets/images/inventory/invalid.png';

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
			desc: null,
			button: <Button onClick={handleAddInventory}>Add!</Button>,
		},
		[InventoryPlaceholderTheme.INVALID_CATEGORY]: {
			image: InvalidCategoryImg,
			alt: 'Invalid category',
			title: 'There is no such category',
			desc: (
				<div className={styles.empty__desc}>
					<p className={styles.empty__text}>
						Start by adding inventory items to keep everything organized and easily accessible.
					</p>
					<p className={styles.empty__text}>
						Try using a different search query. The category you’re looking for might appear.
					</p>
				</div>
			),
			button: null,
		},
		[InventoryPlaceholderTheme.INVALID_SEARCH]: {
			image: InvalidCategoryImg,
			alt: 'Invalid search',
			title: 'No items found',
			desc: null,
			button: null,
		},
	};

	return (
		<div className={classNames(styles.empty, {}, [className])}>
			<Image src={data[theme].image} alt={data[theme].alt} maxWidth={450} />
			<h2>{data[theme].title}</h2>
			{data[theme].desc}
			{data[theme].button}
		</div>
	);
});

export { InventoryPlaceholder };