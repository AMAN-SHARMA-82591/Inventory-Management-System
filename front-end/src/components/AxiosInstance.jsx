import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.BACKEND_HOST || "http://localhost:5001",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("user"),
  },
});

export default axiosInstance;
