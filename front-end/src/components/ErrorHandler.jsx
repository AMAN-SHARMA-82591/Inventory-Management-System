import { toast } from "react-toastify";
import { toastError } from "./ToastContainer";

export const handleError = (error) => {
  if (error.response) {
    // Handle server errors
    if (error.response.status === 400) {
      toastError(`Validation Error: ${error.response.data.msg}`);
      console.log('ErrorHandler', error.response);
    } else if (error.response.status === 401) {
      // Handle authentication errors
      if (
        error.response.data.msg === "Token has expired. Please log in again."
      ) {
        toastError("Your session has expired. Please log in again.");
        localStorage.removeItem("user"); // Clear token from localStorage
        window.location.href = "/login"; // Redirect to login page
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
