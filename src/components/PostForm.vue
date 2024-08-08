<template>
  <form class="form" @submit.prevent>
    <h4>Create new post</h4>
    <app-input v-focus v-model="post.title" placeholder="Title" />
    <!-- Двухстороннее связывание через v-model -->
    <!-- Двухстороннее связывание через v-bind и @input:
     Add to input:
      v-bind:value="post.title"
      @input="post.title = $event.target.value"
    -->
    <app-input v-model="post.body" placeholder="Description" />
    <!-- Обработка события клик |v-on:click === @click| -->
    <app-button class="form-btn" @click="createPost">Create</app-button>
  </form>
</template>

<script>
export default {
  methods: {
    createPost() {
      this.post.id = Date.now();
      this.$emit("create", this.post);
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

.form-btn {
  margin-top: 15px;
}
</style>

<!-- 1. Пропсы нельзя изменять в доченем компоненте!
      2. Как из ребенка передавать компоненты к родителю-->
