<template>
  <div v-if="posts.length > 0">
    <h3>Technologies list:</h3>
    <!-- transition-group for animation -->
    <transition-group name="post-list">
      <!-- v-bind:prop - пробежка по массиву, маппинг и отображение дочю компонента -->
      <post-item
        :post="post"
        class="post"
        v-for="post in posts"
        :key="post.id"
        @delete="$emit('delete', post)"
      />
      <!-- слушаем событие delete и там эмитим еще раз наверх событие и пост-->
    </transition-group>
  </div>
  <h2 v-else style="color: red">Posts list is empty</h2>
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

/**animation styles - adding/deleting*/
.post-list-enter-active,
.post-list-leave-active {
  transition: all 0.4s ease;
}
.post-list-enter-from,
.post-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/**animation styles - sorting*/
.post-list-move {
  transition: transform 1s;
}
</style>
