import { AxiosError } from "axios";
import { instance } from "./instance";

// instance.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//   }
// });

export const generateErrorFromResponse = (error: unknown): string => {
  if (error instanceof AxiosError) {
    console.log(error);

    return (
      error.response?.data.message ||
      error.response?.data.error ||
      error.response?.statusText ||
      error.cause
    );
  }
  if (error instanceof Error) {
    return error.message;
  }
  if (error instanceof Object) {
    return Object.values(error).join(", ");
  }
  if (typeof error === "string") {
    return error;
  }
  return "Unknown error, something went wrong";
};

export default instance;
