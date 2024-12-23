import { createAuthHeaders } from '@shared/lib/createAuthHeaders';
import { EnvConfigs } from '@shared/config/env';
import axiosInstance from '@shared/config/axios';
import type { ICamp } from '../model/types/Camp.types';

const mode = EnvConfigs.BMCRM_ENV;

export const campApi = {
	getCamp: async (campID?: string): Promise<ICamp> => {
		const endpoint = `https://api.${mode}.bmcrm.camp/camps${campID ? `/${campID}` : ''}`;
		const headers = createAuthHeaders();

		const response = await axiosInstance.get(endpoint, { headers });

		return response.data;
	},
	updateCamp: async (payload: Partial<ICamp>): Promise<ICamp> => {
		const endpoint = `https://api.${mode}.bmcrm.camp/camps/${payload.camp_id}`;
    const headers = createAuthHeaders();

    const response = await axiosInstance.patch(endpoint, payload, { headers });

    return response.data;
	},
};