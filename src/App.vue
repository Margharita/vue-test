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
    <post-list :posts="posts" @delete="removePost" />
    <!-- v-bind:prop - прокидывает пропсы в компонент |v-bind:prop === :prop| -->
    <!-- @delete - прослушка конечная и вызов функции в родительском компоненте -->
  </div>
</template>

<script>
import PostForm from "./components/PostForm.vue";
import PostList from "./components/PostList.vue";

export default {
  components: { PostForm, PostList },

  data() {
    return {
      dialogVisible: false,
      posts: [
        { id: 1, title: "JavaScript", body: "JavaScript description" },
        { id: 2, title: "Go", body: "Go description" },
        { id: 3, title: "Python", body: "Python description" },
        { id: 4, title: "Java", body: "Java description" },
        { id: 5, title: "C#", body: "C# description" },
      ],
      title: "",
      body: "",
    };
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
