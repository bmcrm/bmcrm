import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import axios from 'axios';
import { EnvConfigs } from 'shared/config/env/env';
import { ICampOverview } from '../../types/camp.types';

interface CampState {
  isLoading: boolean;
  isError: string | Error | null;
  getCamp(campID: string): Promise<ICampOverview>;
}

const mode = EnvConfigs.BMCRM_ENV;

const useCamp = create<CampState>()(
  devtools(set => ({
    isLoading: false,
    isError: null,
    getCamp: async (campID: string) => {
      try {
        set({ isLoading: true });
        const response = await axios.get(`https://api.${mode}.bmcrm.camp/camps/${campID}`);

        if (!response.data) {
          set({ isError: new Error() });
        }

        return response?.data || null;
      } catch (error) {
        throw new Error('Error fetching campers: ' + error);
      } finally {
        set({ isLoading: false });
      }
    },
  }))
);

export default useCamp;
