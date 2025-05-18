import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ToastType = {
  SUCCESS: "success",
  ERROR: "error",
  INFO: "info",
  WARNING: "warning",
};

export function showToast(message, type = ToastType.INFO) {
  const options = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    transition: toast.Slide,
    theme: "colored",
  };

  switch (type) {
    case ToastType.SUCCESS:
      toast.success(message, options);
      break;
    case ToastType.ERROR:
      toast.error(message, { ...options, autoClose: 5000 }); // Error messages stay longer
      break;
    case ToastType.WARNING:
      toast.warning(message, options);
      break;
    case ToastType.INFO:
    default:
      toast.info(message, options);
      break;
  }
}

export function ToastManager() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
      transition={toast.Slide}
    />
  );
}
