<script setup lang="ts">
import { ref } from 'vue'
import Routes from '../consts/Routes'
defineProps<{ msg: string }>()

const createUsername = ref(null)
const createPassword = ref(null)
const confirmPassword = ref(null)
const onRegisterClick = () => {
  console.log('>onRegisterClick')
}

</script>

<template>
  <h1>Register</h1>
  <hr />

<div>
  <label for="username">Username: </label>
  <br>
  <input ref="createUsername" id="username">
</div>

  <div>
    <label for="username">Password: </label>
    <br>
    <input ref="createPassword" id="password">
  </div>

  <div>
    <label for="username">Confirm password: </label>
    <br>
    <input ref="confirmPassword" id="username">
  </div>

  <div><button @click="onRegisterClick">Register</button></div>
  <RouterLink :to="Routes.REGISTER"></RouterLink>

</template>

<style scoped>

</style>
