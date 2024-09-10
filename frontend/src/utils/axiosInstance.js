import axios from "axios";

const init = (path = "") => {
  const instance = axios.create({
    baseURL: `${import.meta.env.LARAVEL_BASE_URL}${path}`,
    withCredentials: true,
    timeout: 180000,
  });

  instance.interceptors.request.use((config) => {
    config.headers.Accept = "application/json";
    config.headers["Content-Type"] = "application/json";
    config.headers.Authorization = `Bearer ${sessionStorage.getItem("token")}`;

    return config;
  });

  return instance;
};

const axiosInstance = init("/api");
export const axiosInstanceRoot = init();
export default axiosInstance;
