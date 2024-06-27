import { create } from 'zustand';
import { ICamper } from '../../types/camper.types';
import { devtools } from 'zustand/middleware';
import { fetchCampers } from 'shared/api/fetchCampers/fetchCampers';
import { AxiosError } from 'axios';

interface CamperState {
  isLoading: boolean;
  campers: ICamper[];
  campersCount: number;
  isError: string | null | Error | AxiosError;
  resetError: () => void;
  getCampers(): Promise<void>;
  getCamper(email: string): Promise<ICamper | null>;
  updateCamper(email: string, data: Partial<ICamper>): Promise<ICamper>;
}

const useCampers = create<CamperState>()(
  devtools(set => ({
    isLoading: false,
    isError: null,
    campers: [],
    campersCount: 0,
    resetError: () => set({ isError: null }),
    getCampers: async () => {
      try {
        set({ isLoading: true });
        const response = await fetchCampers({ method: 'get' });

        set({ campers: response.data, campersCount: response.data.length });
      } catch (error) {
        console.error(error);
        set({ isError: error as AxiosError });
      } finally {
        set({ isLoading: false });
      }
    },
    getCamper: async email => {
      try {
        const response = await fetchCampers({ method: 'get', endpoint: email });

        return response?.data || null;
      } catch (error) {
        set({ isError: error as AxiosError });
      }
    },
    updateCamper: async (email, data) => {
      try {
        const response = await fetchCampers({
          method: 'patch',
          endpoint: email,
          payload: { ...data, email: email },
        });

        set({ campers: response.data });

        return response.data;
      } catch (error) {
        set({ isError: error as AxiosError });
      }
    },
  }))
);

export default useCampers;
