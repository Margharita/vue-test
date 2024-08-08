<template>
  <div class="post">
    <div>
      <!-- интерполяция (ниже) -->
      <div>{{ post.id }}</div>
      <div><strong>Title:</strong> {{ post.title }}</div>
      <div><strong>Description:</strong> {{ post.body }}</div>
    </div>
    <div class="post__btns">
      <app-button @click="$router.push(`/posts/${post.id}`)">Open</app-button>
      <app-button @click="$emit('delete', post)">Delete</app-button>
      <!-- прокидываем наверх (эмитим) событие вместе с нужным постом -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.post {
  padding: 15px;
  border: 1px solid teal;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.post__btns {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
}

.post__btns button:not(:last-of-type) {
  margin-right: 16px;
}
</style>
