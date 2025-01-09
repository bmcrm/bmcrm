import { memo, useState, useEffect, type ReactElement, useCallback } from 'react';
import { Modal } from '@shared/ui/Modal';
import { DetailsDefault } from '../DetailsDefault/DetailsDefault';
import { DetailsEditing } from '../DetailsEditing/DetailsEditing';
import type { IInventoryItem } from '@entities/Inventory';
import { InventoryDetailsModalTheme } from '../../model/types/InventoryDetailsModal.types';

type InventoryDetailsModalProps = {
	isOpen: boolean;
	onClose: () => void;
	item: IInventoryItem;
	handleDelete: () => void;
	theme?: InventoryDetailsModalTheme;
};

const InventoryDetailsModal = memo((props: InventoryDetailsModalProps) => {
	const { isOpen, onClose, item, handleDelete, theme = InventoryDetailsModalTheme.DEFAULT } = props;
	const [currentTheme, setCurrentTheme] = useState<InventoryDetailsModalTheme>(theme);

	useEffect(() => {
		setCurrentTheme(theme);
	}, [theme]);

	const closeHandler = useCallback(() => {
		setCurrentTheme(InventoryDetailsModalTheme.DEFAULT);
		onClose();
	}, [onClose]);

	const content: Record<InventoryDetailsModalTheme, ReactElement> = {
		[InventoryDetailsModalTheme.DEFAULT]: <DetailsDefault
			item={item}
			handleDelete={handleDelete}
			onEdit={() => setCurrentTheme(InventoryDetailsModalTheme.EDIT)}
		/>,
		[InventoryDetailsModalTheme.EDIT]: <DetailsEditing
			item={item}
			cancelEdit={() => setCurrentTheme(InventoryDetailsModalTheme.DEFAULT)}
		/>,
	};

	return (
		<Modal isOpen={isOpen} onClose={closeHandler}>
			{content[currentTheme]}
		</Modal>
	);
});

export { InventoryDetailsModal };