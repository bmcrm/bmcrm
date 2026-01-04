import { EnvConfigs } from '@shared/config/env';

const mode = EnvConfigs.BMCRM_ENV;

export const CAMP_ENDPOINT = `https://api.${mode}.bmcrm.camp/camps`;

export const CAMP_LAYOUT_ENDPOINT = `https://api.${mode}.bmcrm.camp/camp_layout`;

export const CAMPER_ENDPOINT = `https://api.${mode}.bmcrm.camp/campers`;

export const INVENTORY_ENDPOINT = `https://api.${mode}.bmcrm.camp/inventory`;

export const SHIFT_ENDPOINT = `https://api.${mode}.bmcrm.camp/shifts`;
