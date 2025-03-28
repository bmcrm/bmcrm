import type { IInventoryItem } from '@entities/Inventory';
import type { IFilesWithPreview } from '@features/FilesInput';

export const generateInitialValues = (item: IInventoryItem) => {
	const { title, description, price, quantity, category, images } = item;

	const initialValues: Partial<IInventoryItem> & { files: IFilesWithPreview[] } = {
		title,
		description,
		price,
    quantity,
    category,
    images,
		files: [],
	};

	const initialData = {
		default: [
			{
				name: 'title',
				placeholder: 'Knife for cutting',
				label: 'Title',
			},
			{
				name: 'description',
				placeholder: 'This knife is nice',
				label: 'Description',
			},
		],
		nested: [
			{
				name: 'price',
				placeholder: '$120',
				label: 'Price (1 pc)',
				type: 'number',
			},
			{
				name: 'quantity',
				placeholder: '5',
				label: 'Quantity',
				type: 'number',
			},
		],
	};

	return { initialValues, initialData };
};