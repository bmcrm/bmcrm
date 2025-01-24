import type { CamperTags, FormikTag } from '../model/types/Camper.types';

export const normalizeTags = (tags: FormikTag[]) =>
	tags.reduce((acc, { tagName, tagDetails }) => {
		acc[tagName] = tagDetails;
		return acc;
	}, {} as CamperTags);