import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import App from './App.vue';
import router from './router';

import Vuesax from 'vuesax3';
import 'vuesax3/dist/vuesax.css';

// import './assets/main.css';
const app = createApp(App);

app.use(Vuesax);
app.use(createPinia().use(piniaPluginPersistedstate));
app.use(router);

app.mount('#app');
