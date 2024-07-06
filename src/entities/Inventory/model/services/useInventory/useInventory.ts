import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { fetchCampers } from 'shared/api/fetchCampers/fetchCampers';
import { AxiosError } from 'axios';
import { IInventoryItem } from '../../types/types';

interface CamperState {
  isLoading: boolean;
  inventory: IInventoryItem[];
  isError: string | null | Error | AxiosError;
  resetError: () => void;
  getItems(): Promise<void>;
  getItem(id: string): Promise<IInventoryItem | null>;
  updateItem(item: Partial<IInventoryItem>, id: string): Promise<IInventoryItem>;
  createItem(item: Partial<IInventoryItem>): Promise<IInventoryItem>;
  deleteItem(id: string): Promise<IInventoryItem>;
}

const useCampers = create<CamperState>()(
  devtools(set => ({
    isLoading: false,
    isError: null,
    inventory: [],
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
        set({ isLoading: true });
        const response = await fetchCampers({ method: 'get', endpoint: email });

        return response?.data || null;
      } catch (error) {
        set({ isError: error as AxiosError });
      } finally {
        set({ isLoading: false });
      }
    },
    updateCamper: async (email, data) => {
      try {
        set({ isLoading: true });
        const response = await fetchCampers({
          method: 'patch',
          endpoint: email,
          payload: { ...data, email: email },
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

export default useCampers;
