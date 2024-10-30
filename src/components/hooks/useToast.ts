import { toastStore } from '../ui/Toaster';

export const useToast = () => {
  return {
    success: (message: string) => toastStore.addToast(message, 'success'),
    error: (message: string) => toastStore.addToast(message, 'error'),
    info: (message: string) => toastStore.addToast(message, 'info'),
  };
};