/* eslint-disable */
import axios from "axios";
// import { toast } from "react-toastify";
// import { TOASTER_STYLING_VALUES } from "../config";

const user = JSON.parse(localStorage.getItem("xanthica_user"));

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};
if (user) headers.Authorization = `Bearer ${user?.access_token}`;

const api = axios.create({
  baseURL: process.env.REACT_APP_DEV_AI_API_URL,
  headers,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      // toast.error(
      //   "Session expired, please signIn again to continue",
      //   TOASTER_STYLING_VALUES
      // );
      // setTimeout(() => {
        // localStorage.removeItem("xanthica_user");
    
        window.location.href = "/session/expire";
      // }, 1000);
    }

    let { message } = error.response.data;

    if (!message) {
      message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
    }

    const errors = {
      errors: error.response.data.errors,
      message,
    };

    // toast.error(message);

    throw errors;
  }
);

export default api;
