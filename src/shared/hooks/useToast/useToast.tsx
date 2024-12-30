import { useCallback, useMemo } from 'react';
import toast, { type ToastOptions } from 'react-hot-toast';

export const useToast = () => {
  const baseOptions: ToastOptions = useMemo(
    () =>
      ({
        position: 'top-center',
        duration: 5000,
      }),
    []
  );

  const error = useCallback((message: string) => {
    toast.error(message, baseOptions);
  }, [baseOptions]);

  const success = useCallback((message: string) => {
    toast.success(message, baseOptions);
  }, [baseOptions]);

  return { error, success };
};