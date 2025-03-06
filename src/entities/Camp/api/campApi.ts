import axios from 'axios';
import { createAuthHeaders } from '@shared/lib/createAuthHeaders';
import { CAMP_ENDPOINT } from '@shared/const/endpoints';
import { ICalendarEvent, ICamp, ICampEvent } from '../model/types/Camp.types';

export const campApi = {
	getCamp: async (campID: string): Promise<ICamp> => {
		const endpoint = `${CAMP_ENDPOINT}/${campID}`;
		const headers = createAuthHeaders();

		const response = await axios.get(endpoint, { headers });

		return response.data;
	},
	createCalendarEvent: async (event: ICalendarEvent) => {
		const endpoint = `${CAMP_ENDPOINT}/create-event`;
		const headers = createAuthHeaders();

		const response = await axios.post(endpoint, event, { headers });

		return response.data;
	},
	getCampEvents: async (): Promise<ICampEvent[]> => {
		const endpoint = `${CAMP_ENDPOINT}/events`;
		const headers = createAuthHeaders();

		const response = await axios.get(endpoint, { headers });

		return response.data;
	},
	updateCamp: async (payload: Partial<ICamp>): Promise<ICamp> => {
		const endpoint = `${CAMP_ENDPOINT}/${payload.camp_id}`;
    const headers = createAuthHeaders();

    const response = await axios.patch(endpoint, payload, { headers });

    return response.data;
	},
};