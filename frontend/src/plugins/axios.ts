import axios from 'axios';

const axiosInstance = axios.create({ baseURL: 'http://localhost:3001/' });

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    const defaultMessage = 'Возникла ошибка при выполнении запроса к серверу';
    axiosInstance.$notifier.error(
      error?.response?.data?.error?.message || defaultMessage
    );

    return Promise.reject(error);
  }
);

export default axiosInstance;
