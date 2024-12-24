import { createAuthHeaders } from '@shared/lib/createAuthHeaders';
import { EnvConfigs } from '@shared/config/env';
import axiosInstance from '@shared/config/axios';
import type { ICamper, IInviteCamperData } from '../model/types/Camper.types';

const mode = EnvConfigs.BMCRM_ENV;

export const camperApi = {
	getCampers: async (camperEmail?: string | null): Promise<ICamper | ICamper[]> => {
		const endpoint = `https://api.${mode}.bmcrm.camp/campers${camperEmail ? `/${camperEmail}` : ''}`;
		const headers = createAuthHeaders();

		const response = await axiosInstance.get(endpoint, { headers });

		return response.data;
	},
	updateCamper: async (payload: Partial<ICamper>): Promise<ICamper> => {
		const endpoint = `https://api.${mode}.bmcrm.camp/campers${payload.email}`;
		const headers = createAuthHeaders();

		const response = await axiosInstance.patch(endpoint, payload, { headers });

		return response.data;
	},
	inviteCamper: async (payload: IInviteCamperData) => {
		const endpoint = `https://api.${mode}.bmcrm.camp/campers`;
		const headers = createAuthHeaders();

		const response = await axiosInstance.post(endpoint, payload, { headers });

		return response.data;
	},
};