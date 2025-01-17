import { CustomInputTheme } from '@shared/ui/CustomInput';

export const leftInputs = [
	{
		name: 'camp_name',
		placeholder: 'Sparkle Unicorns',
		label: 'Name your camp',
		theme: CustomInputTheme.CONTROLLED,
		controlledInputName: 'camp_id',
	},
	{
		name: 'camp_id',
		placeholder: 'sparkle-unicorns',
		label: 'Camp ID',
		disabled: true,
	},
	{
		name: 'city',
		placeholder: 'Miami',
		label: 'Hometown',
	},
	{
		name: 'camp_website',
		placeholder: 'www.sparkle-unicorns.org',
		label: 'Website',
	},
];

export const rightInputs = {
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
			name: 'playa_name',
			placeholder: 'Playa Name',
			label: 'Playa Name',
		},
		{
			name: 'email',
			placeholder: 'cole@gmail.com',
			label: 'Email',
			type: 'email',
		},
		{
			name: 'password',
			placeholder: 'Min. 8 characters',
			label: 'Password',
			type: 'password',
			theme: CustomInputTheme.PASSWORD_TOOLTIP,
		},
	],
};

export const initialData = {
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
