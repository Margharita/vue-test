import { createRouter, createWebHistory } from "vue-router";
import Main from "./../pages/Main.vue";
import Posts from "./../pages/Posts.vue";
import About from "./../pages/About.vue";

const routes = [
  {
    path: "/",
    component: Main,
  },
  {
    path: "/about",
    component: About,
  },
  {
    path: "/posts",
    component: Posts,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL),
});

export default router;
