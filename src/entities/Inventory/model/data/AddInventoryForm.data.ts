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

export const initialValues = {
	title: '',
	description: '',
	category: '',
	price: '',
	quantity: '',
};