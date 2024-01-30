import axios from "axios";

const init = (path = "") => {
  const instance = axios.create({
    baseURL: `http://localhost:8006${path}`,
    withCredentials: true,
    withXSRFToken: true,
    timeout: 30000,
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
