import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_HOST,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("user"),
  },
});

export default axiosInstance;
