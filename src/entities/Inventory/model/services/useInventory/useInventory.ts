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
  getItem(id: string): Promise<IInventoryItem>;
  updateItem(item: Partial<IInventoryItem>, id: string): Promise<void>;
  createItem(item: Partial<IInventoryItem>): Promise<void>;
  deleteItem(id: string): Promise<void>;
}

const useInventory = create<InventoryState>()(
  devtools(set => {
    const fetchWrapper = async (asyncFn: () => Promise<void>): Promise<void> => {
      try {
        set({ isLoading: true });
        await asyncFn();
      } catch (error) {
        set({ isError: error as AxiosError });
      } finally {
        set({ isLoading: false });
      }
    };

    return {
      isLoading: false,
      isError: null,
      inventoryCount: 0,
      inventory: [],
      resetError: () => set({ isError: null }),

      getItems: () =>
        fetchWrapper(async () => {
          const response = await fetchInventory({ method: 'get' });
          set({ inventory: response.data, inventoryCount: response.data.length });
        }),

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

      updateItem: (item, id) =>
        fetchWrapper(async () => {
          await fetchInventory({
            method: 'patch',
            endpoint: id,
            payload: item,
          });
        }),

      createItem: (item: FormData) =>
        fetchWrapper(async () => {
          const response = await fetchInventory({
            method: 'post',
            payload: item as Partial<IInventoryItem>,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          set({ inventory: [...useInventory.getState().inventory, response.data] });
        }),

      deleteItem: id =>
        fetchWrapper(async () => {
          await fetchInventory({
            method: 'delete',
            endpoint: id,
          });
          set({
            inventory: useInventory.getState().inventory.filter(invItem => invItem.id !== id),
            inventoryCount: useInventory.getState().inventoryCount - 1,
          });
        }),
    };
  })
);

export default useInventory;
