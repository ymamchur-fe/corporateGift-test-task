<template>
  <div id="app">
    <h1>Star Wars Characters</h1>
    <progress :value="loadingProgress" :max="100" />

    <div>
      <p>Men: {{menCount}}</p>
      <p>Women: {{womenCount}}</p>
      <person-card v-for="person in people" :key="person.id" :person="person" />
    </div>
  </div>
</template>

<script setup>
import { usePeopleStore } from '../store/people';
import { onMounted, computed } from 'vue';
import PersonCard from "../components/PersonCard.vue";

const store = usePeopleStore();

onMounted(() => {
  if (!store.people.length) store.fetchPeople()
})

const people = computed(() => store.people);
const menCount = computed(() => store.menCount)
const womenCount = computed(() => store.womenCount)
const loadingProgress = computed(() => store.loadingProgress)

</script>

<style scoped>
progress {
  width: 100%;
}
</style>
