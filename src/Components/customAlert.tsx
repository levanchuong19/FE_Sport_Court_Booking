import { createRoot } from 'react-dom/client'; // bạn có rồinếu muốn style riêng
import { Alert, AlertDescription, AlertTitle } from './alert';
import { useEffect } from 'react';

export function customAlert(title: string, message: string, variant: "default" | "destructive" = "default", duration = 5000) {
  const container = document.createElement('div');
  container.className = 'custom-toast-wrapper fixed top-4 right-4 z-[9999]';
  document.body.appendChild(container);

  const root = createRoot(container);

  const ToastComponent = () => {
    useEffect(() => {
      const timer = setTimeout(() => {
        root.unmount();
        document.body.removeChild(container);
      }, duration);
      return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
      root.unmount();
      document.body.removeChild(container);
    };

    return (
      <div className="mb-2 w-[300px]">
        <Alert variant={variant}>
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
          onClick={handleClose}
          aria-label="Đóng thông báo"
        >
          ✕
        </button>
          <AlertTitle>{title}</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      </div>
    );
  };

  root.render(<ToastComponent />);
}
