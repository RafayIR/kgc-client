import axios from "axios";
import LocalStorageService from "../../localStorageServices";

const instance = axios.create({
  // baseURL: "http://localhost:8050/",
  baseURL: "https://server-stg-eufp.onrender.com/",
});

instance.interceptors.request.use(
  (config) => {
      const token = LocalStorageService.getObject('token'); // Assume token is stored in localStorage
      
      if (token) {
          config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
  },
  (error) => {
      return Promise.reject(error);
  }
);

export default instance;

