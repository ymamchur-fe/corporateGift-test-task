<template>
  <div class="person-card">
    <p :style="{ color: person.eye_color }">{{ personInfo }}</p>
    <button @click="editPerson"> Edit </button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { computed, defineProps } from 'vue';
import { IPerson } from "../store/people.ts";

const router = useRouter();
const props = defineProps<{ person: IPerson }>();
const personInfo = computed(() => {
  return `${ props.person.id }: ${ props.person.name } - ${ props.person.gender } - ${ props.person.birth_year }`
})

const editPerson = () => {
  router.push({ name: 'Edit', params: { id: props.person.id } });
};

</script>

<style>
.person-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgb(33, 33, 33);
  color: rgb(255, 255, 255);
  padding: 12px;
  margin: 8px 0;
}
</style>
