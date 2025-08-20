import { ref, reactive, computed, nextTick } from 'vue';
import type { 
  Toast, 
  ToastOptions, 
  ToastPosition, 
  ToastState, 
  UseToastReturn,
  ToastContainerOptions 
} from '../types';

// Global state
const state = reactive<ToastState>({
  toasts: [],
  containers: new Map(),
  defaultOptions: {
    position: 'top-right',
    theme: 'light',
    animation: 'slide',
    maxToasts: 5,
    gap: 8,
    offset: { x: 16, y: 16 },
    zIndex: 9999
  }
});

// Default toast options
const defaultToastOptions: Partial<ToastOptions> = {
  type: 'default',
  duration: 4000,
  position: 'top-right',
  animation: 'slide',
  theme: 'light',
  closable: true,
  pauseOnHover: true,
  swipeable: true,
  draggable: true
};

let toastCounter = 0;

function generateId(): string {
  return `toast-${++toastCounter}-${Date.now()}`;
}

function createToast(options: ToastOptions): Toast {
  const id = options.id || generateId();
  
  return {
    id,
    type: options.type || defaultToastOptions.type!,
    title: options.title || '',
    message: options.message,
    duration: options.duration ?? defaultToastOptions.duration!,
    position: options.position || defaultToastOptions.position!,
    animation: options.animation || defaultToastOptions.animation!,
    theme: options.theme || defaultToastOptions.theme!,
    icon: options.icon || {},
    closable: options.closable ?? defaultToastOptions.closable!,
    pauseOnHover: options.pauseOnHover ?? defaultToastOptions.pauseOnHover!,
    swipeable: options.swipeable ?? defaultToastOptions.swipeable!,
    draggable: options.draggable ?? defaultToastOptions.draggable!,
    className: options.className || '',
    style: options.style || {},
    onClick: options.onClick || undefined,
    onClose: options.onClose || undefined,
    createdAt: Date.now()
  };
}

function addToContainer(toast: Toast): void {
  const position = toast.position;
  
  if (!state.containers.has(position)) {
    state.containers.set(position, []);
  }
  
  const container = state.containers.get(position)!;
  const maxToasts = state.defaultOptions.maxToasts!;
  
  // Add toast to container
  container.unshift(toast);
  
  // Remove excess toasts
  if (container.length > maxToasts) {
    const removed = container.splice(maxToasts);
    removed.forEach(removedToast => {
      if (removedToast.timeoutId) {
        clearTimeout(removedToast.timeoutId);
      }
    });
  }
  
  // Update global toasts array
  state.toasts = Array.from(state.containers.values()).flat();
}

function removeFromContainer(id: string): void {
  for (const [position, container] of state.containers.entries()) {
    const index = container.findIndex(toast => toast.id === id);
    if (index !== -1) {
      const toast = container[index];
      if (toast.timeoutId) {
        clearTimeout(toast.timeoutId);
      }
      container.splice(index, 1);
      break;
    }
  }
  
  // Update global toasts array
  state.toasts = Array.from(state.containers.values()).flat();
}

function setAutoClose(toast: Toast): void {
  if (toast.duration > 0) {
    toast.timeoutId = window.setTimeout(() => {
      dismiss(toast.id);
    }, toast.duration);
  }
}

function show(options: ToastOptions): string {
  const toast = createToast(options);
  
  addToContainer(toast);
  setAutoClose(toast);
  
  nextTick(() => {
    // Trigger any additional side effects
  });
  
  return toast.id;
}

function dismiss(id: string): void {
  const toast = state.toasts.find(t => t.id === id);
  if (toast?.onClose) {
    toast.onClose();
  }
  removeFromContainer(id);
}

function dismissAll(position?: ToastPosition): void {
  if (position) {
    const container = state.containers.get(position);
    if (container) {
      container.forEach(toast => {
        if (toast.timeoutId) {
          clearTimeout(toast.timeoutId);
        }
        if (toast.onClose) {
          toast.onClose();
        }
      });
      container.length = 0;
    }
  } else {
    state.toasts.forEach(toast => {
      if (toast.timeoutId) {
        clearTimeout(toast.timeoutId);
      }
      if (toast.onClose) {
        toast.onClose();
      }
    });
    state.containers.clear();
  }
  
  // Update global toasts array
  state.toasts = Array.from(state.containers.values()).flat();
}

function clear(): void {
  dismissAll();
}

function update(id: string, options: Partial<ToastOptions>): void {
  const toast = state.toasts.find(t => t.id === id);
  if (toast) {
    Object.assign(toast, options);
  }
}

function success(message: string, options: Partial<ToastOptions> = {}): string {
  return show({ ...options, message, type: 'success' });
}

function error(message: string, options: Partial<ToastOptions> = {}): string {
  return show({ ...options, message, type: 'error' });
}

function warning(message: string, options: Partial<ToastOptions> = {}): string {
  return show({ ...options, message, type: 'warning' });
}

function info(message: string, options: Partial<ToastOptions> = {}): string {
  return show({ ...options, message, type: 'info' });
}

function pauseToast(id: string): void {
  const toast = state.toasts.find(t => t.id === id);
  if (toast?.timeoutId) {
    clearTimeout(toast.timeoutId);
    toast.timeoutId = undefined;
  }
}

function resumeToast(id: string): void {
  const toast = state.toasts.find(t => t.id === id);
  if (toast && !toast.timeoutId && toast.duration > 0) {
    setAutoClose(toast);
  }
}

function setDefaults(options: Partial<ToastContainerOptions>): void {
  Object.assign(state.defaultOptions, options);
}

export function useToast(): UseToastReturn {
  return {
    show,
    success,
    error,
    warning,
    info,
    dismiss,
    dismissAll,
    clear,
    update,
    toasts: computed(() => state.toasts)
  };
}

// Export additional utilities
export {
  pauseToast,
  resumeToast,
  setDefaults,
  state as toastState
};
