<template>
  <div>
    <div>
      <!-- long and short directive v-on:click -->
      <button v-on:click="addLike">Like</button>
      <button @click="addDislike">Dislike</button>
    </div>
    <div>
      <!-- interpolation -->
      Likes: <strong>{{ likes }}</strong>
    </div>
    <div>
      Dislikes: <strong>{{ dislikes }}</strong>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      likes: 0,
      dislikes: 0,
    };
  },
  methods: {
    addLike() {
      this.likes += 1;
    },
    addDislike() {
      this.dislikes += 1;
    },
  },
};
</script>

<style></style>
