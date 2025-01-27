import type { CamperTags, FormikTag } from '../model/types/Camper.types';

export const normalizeTags = (tags: FormikTag[]) => {
	const hasEmptyTag = tags.some(tag => tag.tagName === '' && tag.tagDetails.length === 0);

	if (hasEmptyTag) {
		return {};
	}

	return tags.reduce((acc, { tagName, tagDetails }) => {
		acc[tagName] = tagDetails;
		return acc;
	}, {} as CamperTags);
};