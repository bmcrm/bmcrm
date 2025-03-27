import { SocialNetworksData } from '@features/SocialIcon';

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
			name: 'playa_name',
			placeholder: 'Playa Name',
			label: 'Playa Name',
		},
		{
			name: 'city',
			placeholder: 'Miami',
			label: 'Hometown',
		},
	],
};

export const socialOptions = Object.entries(SocialNetworksData).map(([key, { label }]) => ({
	value: key,
	label: label,
}));