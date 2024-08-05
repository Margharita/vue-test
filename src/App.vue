<template>
  <div class="app">
    <header class="app-header">
      <h1>Posts</h1>
      <app-button class="create__btn" @click="showDialog"
        >Create post</app-button
      >
    </header>
    <app-dialog v-model:show="dialogVisible">
      <post-form @create="createPost"
    /></app-dialog>
    <!-- v-bind:prop - прокидывает пропсы в компонент |v-bind:prop === :prop| -->
    <!-- @delete - прослушка конечная и вызов функции в родительском компоненте -->
    <post-list :posts="posts" @delete="removePost" v-if="!isPostsLoading" />
    <div v-else>Loading...</div>
  </div>
</template>

<script>
import axios from "axios";
import PostForm from "./components/PostForm.vue";
import PostList from "./components/PostList.vue";

export default {
  components: { PostForm, PostList },

  data() {
    return {
      dialogVisible: false,
      isPostsLoading: false,
      posts: [],
    };
  },
  mounted() {
    console.log("mount");
    this.fetchPosts();
  },
  methods: {
    showDialog() {
      this.dialogVisible = true;
    },
    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },
    inputTitle(e) {
      this.title = e.target.value;
    },
    inputDescription(e) {
      this.body = e.target.value;
    },
    removePost(post) {
      this.posts = this.posts.filter((p) => p.id !== post.id);
    },
    async fetchPosts() {
      try {
        this.isPostsLoading = true;
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts?_limit=10"
        );
        this.posts = response.data;
        this.isPostsLoading = false;
      } catch (e) {
        console.log(e.error.message);
      }
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  padding: 20px;
}

.app-header {
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
}

.create__btn {
  justify-self: flex-end;
}
</style>
