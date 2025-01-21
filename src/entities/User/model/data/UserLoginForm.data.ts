import { FormikInputTheme } from '@shared/ui/FormikInput';

export const inputsData = [
	{
		name: 'email',
		placeholder: 'example@gmail.com',
		label: 'Email',
		type: 'email',
	},
	{
		name: 'password',
		placeholder: '∗∗∗∗∗∗∗∗',
		label: 'Password',
		type: 'password',
		theme: FormikInputTheme.PASSWORD_NO_TOOLTIP,
	},
];

export const initialValues = {
	email: '',
	password: '',
};