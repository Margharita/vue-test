<template>
  <div v-if="posts.length > 0">
    <h3>Technologies list:</h3>
    <!-- v-bind:prop - пробежка по массиву, маппинг и отображение дочю компонента -->
    <post-item
      :post="post"
      class="post"
      v-for="post in posts"
      :key="post.id"
      @delete="$emit('delete', post)"
    />
    <!-- слушаем событие delete и там эмитим еще раз наверх событие и пост-->
  </div>
</template>

<script>
import PostItem from "./PostItem.vue";
export default {
  components: { PostItem },
  props: {
    posts: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
/** tag has the scoped attribute, its CSS will apply to elements of the current component only. */
</style>
