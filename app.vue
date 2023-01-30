<script setup>
const setting useRuntimeConfig();
await useFetch(`${setting.DATA_URL}/https://jsonplaceholder.typicode.com/users/1`)
</script>




<template>
  <NuxtLayout>
    <NuxtPage :transition="{
          name: 'slide-left',
          mode: 'out-in'
              }" />

  </NuxtLayout>
</template>

