<template>
  <div class="app">
    <post-form @create="createPost" />
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
    createPost(post, second) {
      this.posts.push(post);
      console.log(post, second);
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
</style>
