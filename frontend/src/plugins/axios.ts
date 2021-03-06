import axios from 'axios';

const axiosInstance = axios.create({ baseURL: 'http://localhost:3001/' });

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
