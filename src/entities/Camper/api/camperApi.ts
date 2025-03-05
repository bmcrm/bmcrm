import axios from 'axios';
import { createAuthHeaders } from '@shared/lib/createAuthHeaders';
import { CAMPER_ENDPOINT } from '@shared/const/endpoints';
import type { CampersBirthdays, ICamper, IInviteCamperData } from '../model/types/Camper.types';

export const camperApi = {
	getCampers: async (camperEmail?: string | null): Promise<CampersBirthdays> => {
		const endpoint = `${CAMPER_ENDPOINT}${camperEmail ? `/${camperEmail}` : ''}`;
		const headers = createAuthHeaders();

		const response = await axios.get(endpoint, { headers });

		return response.data;
	},
	getBirthdays: async (): Promise<ICamper[]> => {
		const endpoint = `${CAMPER_ENDPOINT}/birthdays`;
		const headers = createAuthHeaders();

		const response = await axios.get(endpoint, { headers });

		return response.data;
	},
	updateCamper: async (payload: Partial<ICamper>): Promise<ICamper> => {
		const endpoint = `${CAMPER_ENDPOINT}/${payload.email}`;
		const headers = createAuthHeaders();

		const response = await axios.patch(endpoint, payload, { headers });

		return response.data;
	},
	inviteCamper: async (payload: IInviteCamperData) => {
		const headers = createAuthHeaders();

		const response = await axios.post(CAMPER_ENDPOINT, payload, { headers });

		return response.data;
	},
	createCamper: async (payload: Partial<ICamper>) => {
		const endpoint = `${CAMPER_ENDPOINT}/create-camper`;
		const headers = createAuthHeaders();

		const response = await axios.post(endpoint, payload, { headers });

		return response.data;
	},
	deleteCamper: async (email: string) => {
		const encodedEmail = encodeURIComponent(email);
		const endpoint = `${CAMPER_ENDPOINT}/${encodedEmail}`;
		const headers = createAuthHeaders();

		await axios.delete(endpoint, { headers });
	},
};