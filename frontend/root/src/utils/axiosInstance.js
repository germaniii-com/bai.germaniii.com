import axios from "axios";
import Cookies from "universal-cookie";

const init = (path = "") => {
  const cookies = new Cookies();
  const instance = axios.create({
    baseURL: `https://bai-laravel.germaniii.com${path}`,
    withCredentials: true,
    timeout: 180000,
  });

  instance.interceptors.request.use((config) => {
    config.headers.Accept = "application/json";
    config.headers["Content-Type"] = "application/json";
    config.headers["X-XSRF-TOKEN"] = `${cookies.get("XSRF-TOKEN")}`;
    console.log("dociment.cookie", document.cookie);
    return config;
  });

  return instance;
};

const axiosInstance = init("/api");
export const axiosInstanceRoot = init();
export default axiosInstance;
