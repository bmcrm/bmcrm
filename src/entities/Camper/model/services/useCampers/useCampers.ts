import { create } from 'zustand';
import { ICamper } from '../../types/camper.types';
import { devtools } from 'zustand/middleware';
import axios from 'axios';
import { useAuth } from 'entities/User';

interface CamperState {
  isLoading: boolean;
  campers: ICamper[];
  isError: string | null;
  getCampers(): Promise<void>;
  getCamper(email: string): Promise<ICamper | null>;
  updateCamper(email: string, data: Partial<ICamper>): Promise<ICamper>;
}

const mode = import.meta.env.Mode === 'development' ? 'dev' : 'prod';

const useCampers = create<CamperState>()(
  devtools(set => ({
    isLoading: false,
    isError: null,
    campers: [],
    getCampers: async () => {
      try {
        set({ isLoading: true });
        const response = await axios.get(`https://api.${mode}.bmcrm.camp/campers`, {
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
    getCamper: async (email: string) => {
      try {
        const response = await axios.get(`https://api.${mode}.bmcrm.camp/campers/${email}`, {
          headers: {
            Authorization: useAuth.getState().idToken,
          },
        });

        return response?.data || null;
      } catch (error) {
        throw new Error('Error fetching campers: ' + error);
      }
    },
    updateCamper: async (email: string, data: Partial<ICamper>) => {
      try {
        const response = await axios.patch(
          `https://api.${mode}.bmcrm.camp/campers/${email}`,
          { ...data, email: email },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${useAuth.getState().idToken}`,
            },
          }
        );

        set({ isLoading: false, campers: response.data });

        return response.data;
      } catch (error) {
        throw new Error('Error fetching campers: ' + error);
      }
    },
  }))
);

export default useCampers;
