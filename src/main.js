import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import dayjsPlugin from "./plugins/dayjs";
import axiosPlugin from "./plugins/axios";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(dayjsPlugin);
app.use(axiosPlugin);
app.use(ElementPlus)

app.mount("#app");