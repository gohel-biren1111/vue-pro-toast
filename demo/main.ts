import { createApp } from "vue";
import App from "./App.vue";
import VueProToast from "../src/plugin";
import "../src/styles/toast.css";
import "../src/styles/animations.css";

const app = createApp(App);

app.use(VueProToast, {
  theme: "auto",
  position: "top-right",
  animation: "slide",
  maxToasts: 5,
});

app.mount("#app");

// Optional demo toast
const toast = app.config.globalProperties.$toast;
toast.success("Demo toast loaded!");
