import { EnvConfigs } from 'shared/config/env/env';
import axios from 'axios';
import { type ICamp } from 'entities/Camp';

const mode = EnvConfigs.BMCRM_ENV;

interface IFetchCamp {
  method: 'get' | 'post' | 'patch';
  endpoint?: string;
  payload?: Partial<ICamp>;
}

export const fetchCamp = async (props: IFetchCamp) => {
  const { endpoint, payload, method } = props;
  const url = `https://api.${mode}.bmcrm.camp/camps${endpoint ? `/${endpoint}` : ''}`;

  const axiosMethods = {
    get: () => axios.get(url),
    post: () => axios.post(url, payload),
    patch: () => axios.patch(url, payload),
  };

  return axiosMethods[method]();
};