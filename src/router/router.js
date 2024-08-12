import { createRouter, createWebHistory } from "vue-router";
import Main from "./../pages/Main.vue";
import Posts from "./../pages/Posts.vue";
import PostPageWithStore from "./../pages/PostPageWithStore.vue";
import PostsCompositionAPI from "./../pages/PostsCompositionAPI.vue";
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
  {
    path: "/stored/posts",
    component: PostPageWithStore,
  },
  {
    path: "/compositionAPI/posts",
    component: PostsCompositionAPI,
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
