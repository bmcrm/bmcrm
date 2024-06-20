import { EnvConfigs } from 'shared/config/env/env';
import { type ICamp } from 'entities/Camp';
import axiosInstance from 'shared/config/axios';

const mode = EnvConfigs.BMCRM_ENV;

interface IFetchCamp {
  method: 'get' | 'post' | 'patch';
  endpoint?: string;
  payload?: Partial<ICamp>;
}

export const fetchCamp = (props: IFetchCamp) => {
  const { endpoint, payload, method } = props;
  const url = `https://api.${mode}.bmcrm.camp/camps${endpoint ? `/${endpoint}` : ''}`;

  const axiosMethods = {
    get: async () => await axiosInstance.get(url),
    post: async () => await axiosInstance.post(url, payload),
    patch: async () => await axiosInstance.patch(url, payload),
  };

  return axiosMethods[method]();
};
