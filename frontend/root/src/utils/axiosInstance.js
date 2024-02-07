import axios from "axios";

const init = (path = "") => {
  const instance = axios.create({
    baseURL: `bai-laravel.germaniii.com${path}`,
    withCredentials: true,
    withXSRFToken: true,
    timeout: 180000,
  });

  instance.interceptors.request.use((config) => {
    config.headers.Accept = "application/json";
    config.headers["Content-Type"] = "application/json";
    return config;
  });

  return instance;
};

const axiosInstance = init("/api");
export const axiosInstanceRoot = init();
export default axiosInstance;
