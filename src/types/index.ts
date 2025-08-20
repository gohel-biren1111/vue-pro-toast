import type { Ref } from 'vue';

export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'default';

export type ToastPosition = 
  | 'top-right' 
  | 'top-left' 
  | 'top-center' 
  | 'bottom-right' 
  | 'bottom-left' 
  | 'bottom-center' 
  | 'center';

export type ToastAnimation = 
  | 'slide' 
  | 'fade' 
  | 'bounce' 
  | 'zoom-in' 
  | 'zoom-out' 
  | 'flip' 
  | 'elastic';

export type ToastTheme = 'light' | 'dark' | 'auto';

export interface ToastIcon {
  component?: any;
  html?: string;
  class?: string;
}

export interface ToastOptions {
  id?: string;
  type?: ToastType;
  title?: string;
  message: string;
  duration?: number;
  position?: ToastPosition;
  animation?: ToastAnimation;
  theme?: ToastTheme;
  icon?: ToastIcon;
  closable?: boolean;
  pauseOnHover?: boolean;
  swipeable?: boolean;
  draggable?: boolean;
  className?: string;
  style?: Record<string, string>;
  onClick?: (() => void) | undefined;
  onClose?: (() => void) | undefined;
}

export interface Toast extends Required<Omit<ToastOptions, 'id' | 'onClick' | 'onClose'>> {
  id: string;
  createdAt: number;
  timeoutId?: number;
  onClick?: (() => void) | undefined;
  onClose?: (() => void) | undefined;
}

export interface ToastContainerOptions {
  position?: ToastPosition;
  theme?: ToastTheme;
  animation?: ToastAnimation;
  maxToasts?: number;
  gap?: number;
  offset?: {
    x?: number;
    y?: number;
  };
  zIndex?: number;
}

export interface ToastState {
  toasts: Toast[];
  containers: Map<ToastPosition, Toast[]>;
  defaultOptions: ToastContainerOptions;
}

export interface UseToastReturn {
  show: (options: ToastOptions) => string;
  success: (message: string, options?: Partial<ToastOptions>) => string;
  error: (message: string, options?: Partial<ToastOptions>) => string;
  warning: (message: string, options?: Partial<ToastOptions>) => string;
  info: (message: string, options?: Partial<ToastOptions>) => string;
  dismiss: (id: string) => void;
  dismissAll: (position?: ToastPosition) => void;
  clear: () => void;
  update: (id: string, options: Partial<ToastOptions>) => void;
  promise: <T>(promise: Promise<T>, options: any) => Promise<T>;
  batch: (operations: (() => string)[]) => string[];
  enqueue: (options: ToastOptions, priority?: number) => boolean;
  plugins: {
    sound: any;
    keyboard: any;
    analytics: any;
    queue: any;
    promise: any;
  };
  toasts: Readonly<Ref<Toast[]>>;
}
