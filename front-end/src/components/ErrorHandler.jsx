import axiosInstance from "./AxiosInstance";
import { toastError } from "./ToastContainer";

export const handleError = async (error) => {
  if (error.response) {
    // Handle server errors
    if (error.response.status === 400) {
      toastError(`Validation Error: ${error.response.data.msg}`);
    } else if (error.response.status === 401) {
      // Handle authentication errors
      if (error.response.status === 401) {
        if (window.location.pathname !== "/login") {
          toastError("Your session has expired. Please log in again.");
          await axiosInstance.post("/auth/logout");
          localStorage.removeItem("user");
          setTimeout(() => {
            window.location.href = "/login";
          }, 3000);
        }
      } else {
        toastError("Authentication failed. Please log in.");
      }
    } else if (error.response.status === 500) {
      toastError("Server Error: Please try again later.");
    } else {
      toastError(`Unexpected Error: ${error.response.data.msg}`);
    }
  } else if (error.request) {
    // Handle network errors
    toastError("No response from the server. Please check your network.");
  } else {
    // Handle unexpected errors
    toastError("An unexpected error occurred. Please try again.");
  }
};
