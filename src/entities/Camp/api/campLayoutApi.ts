import axios from 'axios';
import { createAuthHeaders } from '@shared/lib/createAuthHeaders';
import { CAMP_LAYOUT_ENDPOINT } from '@shared/const/endpoints';
import type { ICampLayout } from '../model/types/Camp.types';

export const campLayoutApi = {
  getCampLayout: async (): Promise<ICampLayout> => {
    const headers = createAuthHeaders();

    const response = await axios.get(CAMP_LAYOUT_ENDPOINT, { headers });

    return response.data;
  },

  updateCampLayout: async (payload: Partial<ICampLayout>): Promise<ICampLayout> => {
    const headers = createAuthHeaders();

    const response = await axios.patch(CAMP_LAYOUT_ENDPOINT, payload, { headers });

    return response.data;
  },

  deleteCampLayout: async () => {
    const headers = createAuthHeaders();

    await axios.delete(CAMP_LAYOUT_ENDPOINT, { headers });
    return [];
  },
  createCampLayout: async (camp_layout: { layout: string }) => {
    const headers = createAuthHeaders();

    await axios.post(CAMP_LAYOUT_ENDPOINT, { layout: camp_layout.layout }, { headers });
  },
};
