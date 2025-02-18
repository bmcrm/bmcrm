import { CamperRole, type ICamper } from '../model/types/Camper.types';

export const roleOptions = Object
	.values(CamperRole)
	.map(role => ({ value: role, label: role === CamperRole.TCO ? role.toUpperCase() : role}));

export const tagsOptions = (campers?: ICamper[]): { label: string; value: string }[] => {
	if (!campers || campers.length === 0) return [];

	const uniqueTags = new Set(
		campers.flatMap(({ tags }) =>
			tags ? Object.values(tags).flat().map(tag => tag.toLowerCase()) : []
		)
	);

	return Array.from(uniqueTags).map(tag => ({
		label: tag,
		value: tag,
	}));
};