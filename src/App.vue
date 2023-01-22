<script setup lang="ts">
import MainHeader from './components/MainHeader.vue';
import { ref } from 'vue';
import userModel from './model/UserModel';

const userData = ref(userModel!.userData);
// pb.authStore.onChange(() => {
//   userData.value = pb.authStore.model;
// });
</script>

<template>
  <MainHeader :userData="userData"></MainHeader>
  <RouterView v-slot="{ Component }">
    <KeepAlive>
      <Component :is="Component" />
    </KeepAlive>
  </RouterView>
</template>

<style scoped></style>
