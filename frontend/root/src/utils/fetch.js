import axios from "axios";

const fetch = () => {
  const axiosInstance = axios.create({
    baseURL: "localhost:8006/api",
    withCredentials: true,
    withXSRFToken: true,
    timeout: 30000,
  });

  axiosInstance.interceptors.request.use((config) => {
    config.headers.Accept = "application/json";
    config.headers["Content-Type"] = "application/json";
  });

  return axiosInstance;
};

export default fetch;
