import { CamperRole } from '../model/types/Camper.types';

export const BMYearsOptions = (currentYear: number) => (
	Array.from({ length: currentYear - 1985 }, (_, index) => {
		const year = currentYear - index;
		return { value: year.toString(), content: year.toString() };
	})
);

export const roleOptions = Object
	.values(CamperRole)
	.map(role => ({ value: role, content: role === CamperRole.TCO ? role.toUpperCase() : role}));