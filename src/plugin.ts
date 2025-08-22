import type { App } from "vue";
import ToastContainer from "./components/ToastContainer.vue";
import { useToast, setDefaults } from "./composables/useToast";
import type { ToastContainerOptions } from "./types";

export interface ToastPluginOptions extends ToastContainerOptions {
  containerComponent?: string;
}

const VueProToast = {
  install(app: App, options: ToastPluginOptions = {}) {
    if (options) setDefaults(options);
    const componentName = options.containerComponent || "ToastContainer";
    app.component(componentName, ToastContainer);
    const toast = useToast();
    app.config.globalProperties.$toast = toast;
    app.provide("toast", toast);
  },
};

export default VueProToast;
