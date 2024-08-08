import { createApp } from "vue";
import App from "./App.vue";
// экспорт всех UI элементов:
import components from "./components/UI";
import router from "./router/router";
import VIntersection from "./directives/VIntersection";

const app = createApp(App);

// регистрация всех UI элементов:
components.forEach((component) => {
  app.component(component.name, component);
});

app.directive("intersection", VIntersection);

app.use(router).mount("#app");
