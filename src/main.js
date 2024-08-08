import { createApp } from "vue";
import App from "./App.vue";
// экспорт всех UI элементов:
import components from "./components/UI";
import router from "./router/router";

const app = createApp(App);

// регистрация всех UI элементов:
components.forEach((component) => {
  app.component(component.name, component);
});

app.use(router).mount("#app");
