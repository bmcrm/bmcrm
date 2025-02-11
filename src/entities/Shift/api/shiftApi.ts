import axios from 'axios';
import { createAuthHeaders } from '@shared/lib/createAuthHeaders';
import { SHIFT_ENDPOINT } from '@shared/const/endpoints';
import type { IShift, IShiftResponse } from '../model/types/Shift.types';

export const shiftApi = {
	getShifts: async (): Promise<IShiftResponse> => {
		const headers = createAuthHeaders();

		const response = await axios.get(SHIFT_ENDPOINT, { headers });

		return response.data;
	},
	createShift: async (shift: Partial<IShift>) => {
		const headers = createAuthHeaders();

		const response = await axios.post(SHIFT_ENDPOINT, shift, { headers });

		return response.data;
	},
	editShift: async (shift: Partial<IShift>) => {
		const endpoint = `${SHIFT_ENDPOINT}/${shift.shift_id}`;
		const headers = createAuthHeaders();

		const response = await axios.put(endpoint, shift, { headers });

		return response.data;
	},
	deleteShift: async (shiftID: string) => {
		const endpoint = `${SHIFT_ENDPOINT}/${shiftID}`;
		const headers = createAuthHeaders();

		await axios.delete(endpoint, { headers });
	},
};