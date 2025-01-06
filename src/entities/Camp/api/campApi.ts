import { createAuthHeaders } from '@shared/lib/createAuthHeaders';
import axiosInstance from '@shared/config/axios';
import { CAMP_ENDPOINT } from '@shared/const/endpoints';
import type { ICamp } from '../model/types/Camp.types';

export const campApi = {
	getCamp: async (campID: string): Promise<ICamp> => {
		const endpoint = `${CAMP_ENDPOINT}/${campID}`;
		const headers = createAuthHeaders();

		const response = await axiosInstance.get(endpoint, { headers });

		return response.data;
	},
	updateCamp: async (payload: Partial<ICamp>): Promise<ICamp> => {
		const endpoint = `${CAMP_ENDPOINT}/${payload.camp_id}`;
    const headers = createAuthHeaders();

    const response = await axiosInstance.patch(endpoint, payload, { headers });

    return response.data;
	},
};