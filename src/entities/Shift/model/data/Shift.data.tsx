import { FormikInput } from '@shared/ui/FormikInput';
import { FormikTextarea } from '@shared/ui/FormikTextarea';
import { InputsType } from '../types/Shift.types';

export const inputs = {
	caption: [
		{
			name: 'shift_name',
			placeholder: 'Daily Campsite MOOP',
			label: 'Shift Name',
			type: InputsType.INPUT,
		},
		{
			name: 'shift_description',
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

export const initialValues = {
  shift_name: '',
  shift_description: '',
	members: [],
};