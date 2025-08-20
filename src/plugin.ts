import type { App } from 'vue';
import ToastContainer from './components/ToastContainer.vue';
import { useToast, setDefaults } from './composables/useToast';
import type { ToastContainerOptions } from './types';

export interface ToastPluginOptions extends ToastContainerOptions {
  containerComponent?: string;
}

export default {
  install(app: App, options: ToastPluginOptions = {}) {
    // Set default options
    if (options) {
      setDefaults(options);
    }

    // Register global component
    const componentName = options.containerComponent || 'ToastContainer';
    app.component(componentName, ToastContainer);

    // Provide useToast
    const toast = useToast();
    app.config.globalProperties.$toast = toast;
    app.provide('toast', toast);

    // Add global styles
    if (typeof document !== 'undefined') {
      const styleId = 'vue-pro-toast-styles';
      if (!document.getElementById(styleId)) {
        const link = document.createElement('link');
        link.id = styleId;
        link.rel = 'stylesheet';
        link.href = '/node_modules/vue-pro-toast/dist/style.css';
        document.head.appendChild(link);
      }
    }
  }
};
