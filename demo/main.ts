import { createApp } from 'vue';
import App from './App.vue';
import VueProToast from '../src/plugin';

const app = createApp(App);

app.use(VueProToast, {
  theme: 'auto',
  position: 'top-right',
  animation: 'slide',
  maxToasts: 5
});

app.mount('#app');
