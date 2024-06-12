import { create } from 'zustand';
import { ICamper } from '../../types/camper.types';
import { devtools } from 'zustand/middleware';
import axios from 'axios';
import { EnvConfigs } from 'shared/config/env/env';
import { useAuth } from 'entities/User';

interface CamperState {
  isLoading: boolean;
  campers: ICamper[];
  isError: string | null;
  camper: ICamper;
  getCampers(): Promise<void>;
  getCamper(email: string, camp_id: string): Promise<void>;
  getCamperById(id: string): Promise<ICamper>;
  updateCamper(email: string, camp_id: string, data: Partial<ICamper>): Promise<void>;
}

const useCampers = create<CamperState>()(
  devtools(set => ({
    isLoading: false,
    isError: null,
    campers: [],
    camper: {} as ICamper,
    getCampers: async () => {
      try {
        set({ isLoading: true });
        const response = await axios.get('https://campers.dev.bmcrm.camp/campers', {
          headers: {
            Authorization: useAuth.getState().idToken,
          },
        });

        set({ isLoading: false, campers: response.data });
      } catch (error) {
        throw new Error('Error fetching campers: ' + error);
      } finally {
        set({ isLoading: false });
      }
    },
    getCamper: async (email: string, camp_id: string) => {
      try {
        set({ isLoading: true });
        const response = await axios.get(`https://campers.dev.bmcrm.camp/campers/${camp_id}/${email}`, {
          headers: {
            Authorization: useAuth.getState().idToken,
          },
        });

        set({ isLoading: false, camper: response?.data[0] || null });
      } catch (error) {
        throw new Error('Error fetching campers: ' + error);
      } finally {
        set({ isLoading: false });
      }
    },
    updateCamper: async (email: string, camp_id: string, data: Partial<ICamper>) => {
      try {
        set({ isLoading: true });
        const response = await axios.patch('https://campers.dev.bmcrm.camp/campers', {
          headers: {
            Authorization: useAuth.getState().idToken,
          },
          body: { ...data, email: email, camp_id: camp_id },
        });

        set({ isLoading: false, campers: response.data });
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
