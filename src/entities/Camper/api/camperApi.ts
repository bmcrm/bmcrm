import axios from 'axios';
import { createAuthHeaders } from '@shared/lib/createAuthHeaders';
import axiosInstance from '@shared/config/axios';
import { CAMPER_ENDPOINT } from '@shared/const/endpoints';
import type { ICamper, IInviteCamperData } from '../model/types/Camper.types';

export const camperApi = {
	getCampers: async (camperEmail?: string | null): Promise<ICamper[]> => {
		const endpoint = `${CAMPER_ENDPOINT}${camperEmail ? `/${camperEmail}` : ''}`;
		const headers = createAuthHeaders();

		const response = await axios.get(endpoint, { headers });

		return response.data;
	},
	updateCamper: async (payload: Partial<ICamper>): Promise<ICamper> => {
		const endpoint = `${CAMPER_ENDPOINT}/${payload.email}`;
		const headers = createAuthHeaders();

		const response = await axiosInstance.patch(endpoint, payload, { headers });

		return response.data;
	},
	inviteCamper: async (payload: IInviteCamperData) => {
		const headers = createAuthHeaders();

		const response = await axiosInstance.post(CAMPER_ENDPOINT, payload, { headers });

		return response.data;
	},
};