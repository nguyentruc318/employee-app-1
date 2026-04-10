import axios, { type AxiosInstance } from "axios";

const createHttp = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_ENDPOINT,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  instance.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => Promise.reject(error),
  );

  // Response interceptor
  instance.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error),
  );

  return instance;
};

const axiosHttp = createHttp();

export default axiosHttp;
