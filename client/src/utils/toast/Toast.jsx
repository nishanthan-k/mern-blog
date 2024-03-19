import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toast = ({ message, type }) => {
  const showToast = () => {
    const toastOptions = {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    };

    // Set toast style based on type
    if (type === "success") {
      toastOptions.toastStyle = { background: "green" }; // Green background for success
      toast.success(message, toastOptions);
    } else if (type === "failure") {
      toastOptions.toastStyle = { background: "red" }; // Red background for failure
      toast.error(message, toastOptions);
    }
  };

  // Show toast when component mounts
  React.useEffect(() => {
    showToast();
  }, []);

  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
};

export default Toast;
