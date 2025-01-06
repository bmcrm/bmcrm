import { EnvConfigs } from '@shared/config/env';
import axiosInstance from '@shared/config/axios';
import type { IInventoryItem } from '@entities/Inventory/model/types/Inventory.types.ts';
import { userState } from '@entities/User';

const mode = EnvConfigs.BMCRM_ENV;

interface IFetchInventory {
  method: 'get' | 'post' | 'patch' | 'delete';
  endpoint?: string;
  payload?: Partial<IInventoryItem>;
  headers?: Record<string, string>;
}

export const fetchInventory = (props: IFetchInventory) => {
  const { endpoint, payload, method } = props;
  const url = `https://api.${mode}.bmcrm.camp/inventory${endpoint ? `/${endpoint}` : ''}`;
  const idToken = userState.getState().tokens?.idToken;
  const headers = {
    Authorization: idToken,
  };

  const axiosMethods = {
    get: async () => await axiosInstance.get(url, { headers }),
    post: async () => await axiosInstance.post(url, payload, { headers }),
    patch: async () => await axiosInstance.patch(url, payload, { headers }),
    delete: async () => await axiosInstance.delete(url, { headers }),
  };

  return axiosMethods[method]();
};
