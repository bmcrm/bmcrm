import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { fetchInventory } from 'shared/api/fetchInventory/fetchInventory';
import { AxiosError } from 'axios';
import { IInventoryItem } from '../../types/types';

interface InventoryState {
  isLoading: boolean;
  inventory: IInventoryItem[];
  inventoryCount: number;
  isError: string | null | Error | AxiosError;
  resetError: () => void;
  getItems(): Promise<void>;
  getItem(id: string): Promise<IInventoryItem | null>;
  updateItem(item: Partial<IInventoryItem>, id: string): Promise<IInventoryItem>;
  createItem(item: Partial<IInventoryItem>): Promise<IInventoryItem>;
  deleteItem(id: string): Promise<IInventoryItem>;
}

const useInventory = create<InventoryState>()(
  devtools(set => ({
    isLoading: false,
    isError: null,
    inventoryCount: 0,
    inventory: [],
    resetError: () => set({ isError: null }),
    getItems: async () => {
      try {
        set({ isLoading: true });
        const response = await fetchInventory({ method: 'get' });

        set({ inventory: response.data, inventoryCount: response.data.length });
      } catch (error) {
        set({ isError: error as AxiosError });
      } finally {
        set({ isLoading: false });
      }
    },
    getItem: async id => {
      try {
        set({ isLoading: true });
        const response = await fetchInventory({ method: 'get', endpoint: id });

        return response?.data || null;
      } catch (error) {
        set({ isError: error as AxiosError });
      } finally {
        set({ isLoading: false });
      }
    },
    updateItem: async (item, id) => {
      try {
        set({ isLoading: true });
        const response = await fetchInventory({
          method: 'patch',
          endpoint: id,
          payload: item,
        });

        return response.data;
      } catch (error) {
        set({ isError: error as AxiosError });
      } finally {
        set({ isLoading: false });
      }
    },
    createItem: async item => {
      try {
        set({ isLoading: true });
        const response = await fetchInventory({
          method: 'post',
          payload: item,
        });

        return response.data;
      } catch (error) {
        set({ isError: error as AxiosError });
      } finally {
        set({ isLoading: false });
      }
    },
    deleteItem: async id => {
      try {
        set({ isLoading: true });
        const response = await fetchInventory({
          method: 'delete',
          endpoint: id,
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

export default useInventory;
