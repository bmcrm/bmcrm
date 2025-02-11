import { FormikInput } from '@shared/ui/FormikInput';
import { FormikTextarea } from '@shared/ui/FormikTextarea';
import { InputsType } from '../types/Shift.types';

export const inputs = {
	caption: [
		{
			name: 'title',
			placeholder: 'Daily Campsite MOOP',
			label: 'Shift Name',
			type: InputsType.INPUT,
		},
		{
			name: 'description',
			placeholder: 'Write',
			label: 'Description',
			type: InputsType.TEXTAREA,
		},
	],
};

export const inputComponents = {
	[InputsType.INPUT]: FormikInput,
	[InputsType.TEXTAREA]: FormikTextarea,
};