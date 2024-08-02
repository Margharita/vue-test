<template>
  <div class="app">
    <form class="form" @submit.prevent>
      <h4>Create new post</h4>
      <input
        v-bind:value="title"
        @input="title = $event.target.value"
        class="input"
        type="text"
        placeholder="Title"
      />
      <input
        v-bind:value="body"
        @input="inputDescription"
        class="input"
        type="text"
        placeholder="Description"
      />
      <button class="btn" @click="createPost">Create</button>
    </form>
    <div class="post" v-for="post in posts" :key="post.id">
      <div><strong>Title:</strong> {{ post.title }}</div>
      <div><strong>Description:</strong> {{ post.body }}</div>
    </div>
  </div>
</template>

<script>
export default {
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
    createPost() {
      const newPost = {
        id: Date.now(),
        title: this.title,
        body: this.body,
      };
      this.posts.push(newPost);
      this.title = "";
      this.body = "";
    },
    inputTitle(e) {
      this.title = e.target.value;
    },
    inputDescription(e) {
      this.body = e.target.value;
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

.form {
  display: flex;
  flex-direction: column;
}

.btn {
  margin-top: 15px;
  align-self: flex-end;
  padding: 10px 15px;
}

.input {
  width: 100%;
  bottom: 1px solid teal;
  padding: 10px 15px;
  margin-top: 15px;
  background: none;
  color: teal;
  border: 1px solid teal;
}

.post {
  padding: 15px;
  border: 1px solid teal;
  margin-top: 15px;
}
</style>
