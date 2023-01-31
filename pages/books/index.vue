<script setup>
const user = useUser();
</script>
<template>
  <div>
    Books Page: {{ user.name }}
    <div>
      <NuxtLink to="/">Home</NuxtLink>
    </div>
  </div>
</template>
