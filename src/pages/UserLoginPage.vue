<script setup lang="ts">
import { ref } from 'vue';
import Routes from '../consts/Routes';
defineProps<{ msg: string }>();

const inputUsername = ref(null);
const inputPassword = ref(null);
const onLoginClick = () => {
  console.log('> onLoginClick');
};
</script>

<template>
  <h1>Login</h1>
  <hr />


  


  <div>
    <label for="username">Username: </label>
    <br>
    <input ref="inputUsername" id="username"/>
  </div>
  <div>
    <label for="password">Password: </label>
    <br>
    <input ref="inputPassword" id="password"/>
  </div>
  <div style="margin: 1rem 0 2rem">
    <button @click="onLoginClick">Send</button>
  </div>
  <div>
  <RouterLink :to="Routes.REGISTER">
    <small>Register</small>
  </RouterLink>
  </div>

</template>

<style scoped></style>
