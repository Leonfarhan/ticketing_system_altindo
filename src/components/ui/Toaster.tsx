import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface ToasterProps {
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

export const toastStore = {
  listeners: new Set<(toasts: Toast[]) => void>(),
  toasts: [] as Toast[],
  
  subscribe(listener: (toasts: Toast[]) => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  },
  
  addToast(message: string, type: Toast['type'] = 'info') {
    const toast: Toast = {
      id: Math.random().toString(36).substring(2),
      message,
      type,
    };
    this.toasts = [...this.toasts, toast];
    this.notify();
    
    setTimeout(() => {
      this.removeToast(toast.id);
    }, 5000);
  },
  
  removeToast(id: string) {
    this.toasts = this.toasts.filter(t => t.id !== id);
    this.notify();
  },
  
  notify() {
    this.listeners.forEach(listener => listener(this.toasts));
  }
};

export const Toaster: React.FC<ToasterProps> = ({ position = 'bottom-right' }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  
  useEffect(() => {
    return toastStore.subscribe(setToasts);
  }, []);
  
  const positionClasses = {
    'top-right': 'top-0 right-0',
    'top-left': 'top-0 left-0',
    'bottom-right': 'bottom-0 right-0',
    'bottom-left': 'bottom-0 left-0',
  }[position];
  
  return (
    <div className={`fixed z-50 m-8 ${positionClasses}`}>
      <div className="space-y-2">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`
              max-w-sm rounded-lg shadow-lg p-4 flex items-center justify-between
              ${toast.type === 'success' ? 'bg-green-500' : ''}
              ${toast.type === 'error' ? 'bg-red-500' : ''}
              ${toast.type === 'info' ? 'bg-blue-500' : ''}
              text-white
            `}
          >
            <p className="text-sm font-medium">{toast.message}</p>
            <button
              onClick={() => toastStore.removeToast(toast.id)}
              className="ml-4 text-white hover:text-gray-100"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Toaster;