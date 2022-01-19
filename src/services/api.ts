import axios, {AxiosInstance, AxiosResponse, AxiosError} from 'axios';
import {BACKEND_URL, REQUEST_TIMEOUT} from '../const';

const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.response.use(
    (response: AxiosResponse) => response,

    (error: AxiosError) => Promise.reject(error),
  );

  return api;
};

export {createAPI};
