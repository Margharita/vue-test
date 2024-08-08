<template>
  <div class="navbar">
    <div @click="$router.push('/')">Vue 3</div>
    <div class="navbar__btns">
      <app-button @click="$router.push('/posts')">Posts</app-button>
      <app-button @click="$router.push('/about')">About</app-button>
    </div>
  </div>
</template>

<script>
export default { name: "navbar" };
</script>

<style scoped>
.navbar {
  height: 50px;
  background-color: lightgrey;
  box-shadow: 2px 2px 4px gray;
  display: flex;
  padding: 0 15px;
  padding-top: 5px;
}
.navbar__btns {
  margin-left: auto;
}
.navbar__btns button:not(:last-of-type) {
  margin-right: 16px;
}
</style>
