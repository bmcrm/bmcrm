import { EnvConfigs } from 'shared/config/env/env';
import axios from 'axios';
import { type ICamp } from 'entities/Camp';

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
    get: async () => await axios.get(url),
    post: async () => await axios.post(url, payload),
    patch: async () => await axios.patch(url, payload),
  };

  return axiosMethods[method]();
};