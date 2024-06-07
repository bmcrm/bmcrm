import { create } from 'zustand';
import { ICamper } from '../../type';
import { devtools } from 'zustand/middleware';
import axios from 'axios';

interface CamperState {
  isLoading: boolean;
  campers: ICamper[];
  getCampers(): Promise<void>;
  getCamperById(id: string): Promise<ICamper>;
}

const useCampers = create<CamperState>()(
  devtools(set => ({
    isLoading: false,
    campers: [],

    getCampers: async () => {
      set({ isLoading: true });
      const response = await axios.get<ICamper[]>('https://6645accbb8925626f892a498.mockapi.io/campers');
      const data = response.data.filter(camper => camper.campId === 'DO12345');
      set({ isLoading: false, campers: data });
    },
    getCamperById: async (id: string) => {
      set({ isLoading: true });
      const { data } = await axios.get<ICamper>(`https://6645accbb8925626f892a498.mockapi.io/campers/${id}`);
      return data;
    },
  }))
);

export default useCampers;
