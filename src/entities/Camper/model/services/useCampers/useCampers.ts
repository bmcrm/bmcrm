import { create } from 'zustand';
import { ICamper } from '../../type';
import { devtools } from 'zustand/middleware';
import axios from 'axios';
import { EnvConfigs } from 'shared/config/env/env';

interface CamperState {
  isLoading: boolean;
  campers: ICamper[];
  isError: string | null;
  getCampers(): Promise<void>;
  getCamperById(id: string): Promise<ICamper>;
}

const useCampers = create<CamperState>()(
  devtools(set => ({
    isLoading: false,
    isError: null,
    campers: [],

    getCampers: async () => {
      try {
        set({ isLoading: true });
        const response = await axios.get<ICamper[]>(EnvConfigs.CAMPERS_API_URL);
        const data = response.data.filter(camper => camper.campId === 'DO12345');
        set({ isLoading: false, campers: data });
      } catch (error) {
        throw new Error('Error fetching campers: ' + error);
      } finally {
        set({ isLoading: false });
      }
    },
    getCamperById: async (id: string) => {
      try {
        set({ isLoading: true });
        const { data } = await axios.get<ICamper>(EnvConfigs.CAMPERS_API_URL + '/' + id);
        return data;
      } catch (error) {
        throw new Error('Error fetching campers: ' + error);
      } finally {
        set({ isLoading: false });
      }
    },
  }))
);

export default useCampers;