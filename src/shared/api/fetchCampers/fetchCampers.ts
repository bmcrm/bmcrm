import { EnvConfigs } from 'shared/config/env/env';
import { useAuth } from 'entities/User';
import { type ICamper } from 'entities/Camper';
import axiosInstance from 'shared/config/axios';

const mode = EnvConfigs.BMCRM_ENV;

interface IFetchCamper {
  method: 'get' | 'post' | 'patch';
  endpoint?: string;
  payload?: Partial<ICamper>;
}

export const fetchCampers = (props: IFetchCamper) => {
  const { endpoint, payload, method } = props;
  const url = `https://api.${mode}.bmcrm.camp/campers${endpoint ? `/${endpoint}` : ''}`;
  const idToken = useAuth.getState().idToken;
  const headers = {
    Authorization: idToken,
  };

  const axiosMethods = {
    get: async () => await axiosInstance.get(url, { headers }),
    post: async () => await axiosInstance.post(url, payload, { headers }),
    patch: async () => await axiosInstance.patch(url, payload, { headers }),
  };

  return axiosMethods[method]();
};
