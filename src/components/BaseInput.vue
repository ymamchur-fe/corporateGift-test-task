<template>
  <div class="base-input">
    <label :for="label">{{ label }}</label>
    <input :id="label" v-model="model">
  </div>
</template>

<script setup lang="ts">
import { defineModel, defineProps } from 'vue';

interface Props {
  label: string;
  modelValue: string;
}

defineProps<Props>();
const model = defineModel()
</script>
<style scoped>
.base-input {
  display: flex;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 12px;
}
</style>


