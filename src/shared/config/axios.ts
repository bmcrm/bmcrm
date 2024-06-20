import axios from 'axios';

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.status === 401 || error.response.status === 403) {
      window.location.replace('/login');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
