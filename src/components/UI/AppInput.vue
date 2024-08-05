<template>
  <input :value="modelValue" @input="updateInput" class="input" type="text" />
  <!-- двухстороннее связывание - биндим modelValue и для этой же цели слушаем "@input-->
</template>

<script>
export default {
  name: "app-input",
  // имя экспортируемой кнопки
  props: {
    modelValue: [String, Number], // двухстороннее связывание - дочерний компонент
  },
  methods: {
    updateInput(event) {
      this.$emit("update:modelValue", event.target.value);
      // мы эмитим (прокидываем наверх) новое событие и вторым аргументом посылаем новое значение инпута
    },
  },
};
</script>

<style scoped>
.input {
  width: 100%;
  bottom: 1px solid teal;
  padding: 10px 15px;
  margin-top: 15px;
  background: none;
  color: teal;
  border: 1px solid teal;
}
</style>
