import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from '@/router';
import store from '@/store';
import * as ElementIcons from '@element-plus/icons-vue';
import 'element-plus/dist/index.css';

const app = createApp(App);
app.use(router);
app.use(store);
for (const [key, component] of Object.entries(ElementIcons)) {
  app.component(key, component);
}
app.mount('#app');
