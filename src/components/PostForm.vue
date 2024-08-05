<template>
  <form class="form" @submit.prevent>
    <h4>Create new post</h4>
    <input v-model="post.title" class="input" type="text" placeholder="Title" />
    <!-- Двухстороннее связывание через v-model -->
    <!-- Двухстороннее связывание через v-bind и @input:
     Add to input:
      v-bind:value="post.title"
      @input="post.title = $event.target.value"
    -->
    <input
      v-model="post.body"
      class="input"
      type="text"
      placeholder="Description"
    />
    <!-- Обработка события клик |v-on:click === @click| -->
    <app-button class="form-btn" @click="createPost">Create</app-button>
  </form>
</template>

<script>
export default {
  methods: {
    createPost() {
      this.post.id = Date.now();
      this.$emit("create", this.post, "second part");
      this.post = {
        id: null,
        title: "",
        body: "",
      };
    },
  },
  data() {
    return {
      post: {
        id: null,
        title: "",
        body: "",
      },
    };
  },
};
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
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

.form-btn {
  margin-top: 15px;
}
</style>

<!-- 1. Пропсы нельзя изменять в доченем компоненте!
      2. Как из ребенка передавать компоненты к родителю-->
