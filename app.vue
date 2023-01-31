<script setup lang="ts">
const user = useUser();
const books = useBooks();

const { data: userData, pending: isUserLoading } = user.getUser();
const { pending: isBooksLoading } = books.getAll();

console.log('App -> Loading:', { isUserLoading });
</script>
<template>
  <div v-if="isBooksLoading && isUserLoading">Loading...</div>
  <div v-else>
    <div>User {{ userData.name }}</div>
    <NuxtPage :transition="{
      name: 'slide-left',
      mode: 'out-in'
    }" />
  </div>
</template>
