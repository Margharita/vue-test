import { createRouter, createWebHistory } from "vue-router";
import Main from "./../pages/Main.vue";
import Posts from "./../pages/Posts.vue";
import Post from "./../pages/Post.vue";
import About from "./../pages/About.vue";

const routes = [
  // static navigation
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
  // dynamic navigation
  {
    path: "/posts/:id",
    component: Post,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL),
});

export default router;
