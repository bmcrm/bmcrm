import type { IFilesWithPreview } from '@features/FilesInput';

export const inputs = {
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
		{
			name: 'category',
			placeholder: 'Kitchen',
			label: 'Category',
		},
	],
	row: [
		{
			name: 'price',
			placeholder: '$120',
			label: <>Price <span style={{ font: 'var(--font-s)', color: 'var(--color-neutral)' }}>(1 pc)</span></>,
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

export const initialValues = {
	title: '',
	description: '',
	category: '',
	price: '',
	quantity: '',
	files: [] as IFilesWithPreview[],
};