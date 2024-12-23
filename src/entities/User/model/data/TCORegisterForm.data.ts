import type { ITCORegisterForm } from '../types/User.types';

export const inputsData = [
	{
		name: 'playa_name',
		placeholder: 'Playa Name',
		label: 'Playa Name',
		type: 'text',
	},
	{
		name: 'email',
		placeholder: 'cole@gmail.com',
		label: 'Email',
		type: 'email',
	},
];

export const initialData: ITCORegisterForm = {
	camp_name: '',
	camp_id: '',
	city: '',
	camp_website: '',
	first_name: '',
	last_name: '',
	playa_name: '',
	email: '',
	password: '',
	accept: false,
};
