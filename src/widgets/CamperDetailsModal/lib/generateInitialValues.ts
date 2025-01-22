import type { ICamper } from '@entities/Camper';

export const generateInitialValues = (camper: ICamper): Partial<ICamper> => {
	const { first_name, last_name, playa_name, city, role, about_me, history  } = camper;
	const currentYear = new Date().getFullYear();

	return ({
		role,
		first_name: first_name || '',
		last_name: last_name || '',
    playa_name: playa_name || '',
    city: city || '',
    about_me: about_me || '',
		history: history || [{ year: currentYear, value: '' }],
	});
};