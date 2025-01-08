import { memo, type ReactElement } from 'react';
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

	const content: Record<InventoryDetailsModalTheme, ReactElement> = {
		[InventoryDetailsModalTheme.DEFAULT]: <DetailsDefault item={item} handleDelete={handleDelete} />,
		[InventoryDetailsModalTheme.EDIT]: <DetailsEditing />,
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			{content[theme]}
		</Modal>
	);
});

export { InventoryDetailsModal };