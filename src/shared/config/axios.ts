import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.status === 401 || error.response.status === 403) {
      const navigate = useNavigate();
      navigate('/login');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
