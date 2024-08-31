import React, { useEffect } from 'react';
import { toast, ToastOptions } from 'react-toastify';

interface ErrorAlertProps {
  message: string | null;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ message }) => {
  useEffect(() => {
    if (message) {
      const options: ToastOptions = {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        toastId: message,  // Evita que el mismo mensaje se muestre dos veces
      };
      toast.error(message, options);
    }
  }, [message]);

  return null;
};

export default ErrorAlert;
