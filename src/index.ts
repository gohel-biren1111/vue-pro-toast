// Re-export plugin as default
import VueProToast from "./plugin";
export default VueProToast;
export { VueProToast }; // optional named export

// Re-export components
export { default as ToastContainer } from "./components/ToastContainer.vue";
export { default as Toast } from "./components/Toast.vue";

// Re-export composables
export {
  useToast,
  setDefaults,
  pauseToast,
  resumeToast,
} from "./composables/useToast";

// Types
export type {
  Toast as ToastType,
  ToastOptions,
  ToastPosition,
  ToastAnimation,
  ToastTheme,
  ToastIcon,
  ToastContainerOptions,
  UseToastReturn,
} from "./types";

// Utilities
export { GestureHandler } from "./utils/gestures";
export {
  animations,
  getAnimationClasses,
  getAnimationDuration,
} from "./utils/animations";

// Styles
import "./styles/toast.css";
import "./styles/animations.css";
