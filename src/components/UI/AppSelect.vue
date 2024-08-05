<template>
  <select v-model="localModelValue">
    <option value="" disabled>Choose from the list</option>
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.name }}
    </option>
  </select>
</template>

<script>
export default {
  name: "app-select",
  props: {
    modelValue: {
      type: String,
    },
    options: {
      typr: Array,
      default: () => [],
    },
  },
  computed: {
    // должно иметь такое же имя как в v-model
    localModelValue: {
      get() {
        return this.modelValue;
      },
      set(newValue) {
        // value на которое была изменена модель
        console.log(newValue);
        this.$emit("update:modelValue", newValue);
      },
    },
  },
};
</script>

<style lang="scss" scoped></style>
