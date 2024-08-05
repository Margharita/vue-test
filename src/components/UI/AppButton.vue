<template>
  <button class="btn"><slot></slot></button>
  <!-- в slot добавляется все что мы прокидываем внутрь в кнопку, дефолтный слот без названия, есть именованный -->
</template>

<script>
export default {
  name: "app-button",
  // имя экспортируемой кнопки
};
</script>

<style scoped>
.btn {
  align-self: flex-end;
  padding: 10px 15px;
  background: none;
  color: teal;
  border: 1px solid teal;
}
</style>
