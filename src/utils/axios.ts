import axios from 'axios';

const Http = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

///请求拦截
Http.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  },
);

///响应拦截
Http.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  },
);

export default Http;
