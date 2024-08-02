<template>
  <div>
    <div>
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
};
</script>

<style></style>
