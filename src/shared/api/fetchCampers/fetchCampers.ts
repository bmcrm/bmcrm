import { EnvConfigs } from 'shared/config/env/env';
import axios from 'axios';
import { useAuth } from 'entities/User';
import { type ICamper } from 'entities/Camper';

const mode = EnvConfigs.BMCRM_ENV;

interface IFetchCamper {
  method: 'get' | 'post' | 'patch';
  endpoint?: string;
  payload?: Partial<ICamper>;
}

export const fetchCampers = async (props: IFetchCamper) => {
  const { endpoint, payload, method } = props;
  const url = `https://api.${mode}.bmcrm.camp/campers${endpoint ? `/${endpoint}` : ''}`;
  const idToken = useAuth.getState().idToken;
  const headers = {
    Authorization: idToken,
  };

  const axiosMethods = {
    get: () => axios.get(url, { headers }),
    post: () => axios.post(url, payload, { headers }),
    patch: () => axios.patch(url, payload, { headers }),
  };

  return axiosMethods[method]();
};