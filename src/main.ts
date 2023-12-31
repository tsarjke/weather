import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import '@/assets/style/null.scss';
import '@/assets/style/main.scss';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.mount('#app');
