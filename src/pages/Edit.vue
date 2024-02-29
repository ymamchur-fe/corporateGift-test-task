<template>
  <div class="edit-page">
    <h2>Edit Character</h2>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <form>
        <base-input v-model="editablePerson.name" label="Name" />
        <base-input v-model="editablePerson.gender" label="Gender" />
        <base-input v-model="editablePerson.birth_year" label="BirthYear" />
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { usePeopleStore } from '../store/people';
import BaseInput from "../components/BaseInput.vue";

const route = useRoute();
const store = usePeopleStore();
const loading = ref(true);
const editablePerson = ref({});

onMounted(async () => {
  const person = await store.getPersonById(route.params.id);
  loading.value = false;

  if (person?.gender === 'female' && person?.birth_year === '19BBY') {
    editablePerson.value = { ...person };
  }
});
</script>

<style scoped>
.edit-page {
  /* Стилі для сторінки редагування */
}
</style>
