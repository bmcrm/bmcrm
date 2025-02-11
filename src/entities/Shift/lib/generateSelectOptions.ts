import { type ICamper } from '@entities/Camper';

export const tagsOptions = (campers?: ICamper[]): { label: string; value: string }[] => {
	if (!campers || campers.length === 0) return [];

	return campers.map((camper) => {
		const camperName = `${camper.first_name} ${camper.last_name}`;

		return {
			label: camperName,
      value: camperName,
		};
	})
};