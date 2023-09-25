import { toast } from "react-toastify";

export const showSuccessToast = (message: string) => {
  toast.success(message, {
    position: "top-right", // Set the position of the toast
    autoClose: 3000, // Set the duration for the toast to auto-close in milliseconds (3 seconds in this case)
  });
};

export const showLoading = (message: string) => {
  toast.info(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

export const url = import.meta.env.VITE_DOMAIN_URL;
