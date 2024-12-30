import { CustomInputTheme } from '@shared/ui/CustomInput';

export const inputs = {
	name: [
		{
			name: 'first_name',
			placeholder: 'Larry',
			label: 'First Name',
		},
		{
			name: 'last_name',
			placeholder: 'Harvey',
			label: 'Last Name',
		},
	],
	rest: [
		{
			name: 'email',
			placeholder: 'larry@gmail.com',
			label: 'Email',
			type: 'email',
		},
		{
			name: 'password',
			placeholder: 'Min. 8 characters',
			label: 'Password',
			type: 'password',
			theme: CustomInputTheme.PASSWORD,
		},
	],
};

export const initialData = {
	accept: false,
	first_name: '',
	last_name: '',
	playa_name: '',
	about_me: '',
	email: '',
	password: '',
	social_links: [''],
};