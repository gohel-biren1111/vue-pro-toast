import type { App } from "vue";
import ToastContainer from "./components/ToastContainer.vue";
import { useToast, setDefaults } from "./composables/useToast";
import type { ToastContainerOptions } from "./types";

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
    const componentName = options.containerComponent || "ToastContainer";
    app.component(componentName, ToastContainer);

    // Provide useToast
    const toast = useToast();
    app.config.globalProperties.$toast = toast;
    app.provide("toast", toast);

    // **Remove automatic CSS injection**
    // CSS should be imported by consumer project:
    // import 'vue-pro-toast/vue-pro-toast.css'
  },
};
