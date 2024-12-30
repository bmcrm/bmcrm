import { removeExtraSpaces } from '@shared/lib/removeExtraSpaces';
import type { ICamper } from '@entities/Camper';

export const trimFields = (values: Partial<ICamper>): Partial<ICamper> => {
	return {
		about_me: values.about_me ? removeExtraSpaces(values.about_me) : '',
		history: values.history?.map(item => ({
			...item,
			value: item.value ? removeExtraSpaces(item.value) : '',
		})),
	};
};