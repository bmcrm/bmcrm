import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { AxiosError } from 'axios';
import { type ICamp } from '../../types/camp.types';
import { fetchCamp } from 'shared/api/fetchCamp/fetchCamp';

interface CampState {
  isLoading: boolean;
  isError: string | AxiosError | Error | null;
  resetError: () => void;
  getCamp(campID: string): Promise<ICamp>;
  updateCamp(campID: string, data: Partial<ICamp>): Promise<ICamp>;
}

const useCamp = create<CampState>()(
  devtools(set => ({
    isLoading: false,
    isError: null,
    resetError: () => set({ isError: null }),
    getCamp: async campID => {
      try {
        set({ isLoading: true });
        const response = await fetchCamp({ method: 'get', endpoint: campID });

        if (!response.data) {
          set({ isError: new Error() });
        }

        return response?.data || null;
      } catch (error) {
        set({ isError: error as AxiosError });
      } finally {
        set({ isLoading: false });
      }
    },
    updateCamp: async (campID, data) => {
      try {
        set({ isLoading: true });
        const response = await fetchCamp({
          method: 'patch',
          endpoint: campID,
          payload: { ...data },
        });

        return response.data;
      } catch (error) {
        set({ isError: error as AxiosError });
      } finally {
        set({ isLoading: false });
      }
    },
  }))
);

export default useCamp;
