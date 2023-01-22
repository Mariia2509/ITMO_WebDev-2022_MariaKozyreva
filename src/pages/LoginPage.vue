<script setup lang="ts">
import { ref } from 'vue';
import Routes from '../consts/Routes';

import RegistrationForm from '../components/RegistrationForm.vue';

import userModel from '../model/UserModel';
import { IUserModel } from '../model/UserModel'
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';

const errors = ref<string[]>([]);
const isSuccess = ref((userModel as IUserModel)!.isAuthenticated);

console.log('> UserLoginPage -> isSuccess:', isSuccess);

const handleLogin = async (data: any) => {
  console.log('> handleLoginClick', data);
  errors.value = [];
  console.log('\t data', data);
  const {
    onResult,
    onError,
  } = useQuery(
    gql`
      query GetUsers($email: String = "", $password: String = "") {
        users(where: {email: {_eq: $email}, password: {_eq: $password}}) {
          email
          name
          password
          id
        }
      }
    `,
    { email: data.username, password: data.password },
  );
  onResult((queryResult) => {
    if (queryResult.data.users.length > 0) {
      isSuccess.value = true;
      userModel!.setupUser(queryResult.data.users[0]);
    } else {
      errors.value.push('Email or password incorrect');
    }
    console.log(queryResult.data)
    console.log(queryResult.loading)
    console.log(queryResult.networkStatus)
  });
  onError((error) => {
    console.log(error.graphQLErrors)
    console.log(error.networkError)
  })
  // await pb
  //   .collection('users')
  //   .authWithPassword(data.username, data.password)
  //   .then((result: any) => {
  //     console.log('> handleLoginClick -> result:', result);
  //     isSuccess.value = true;
  //   })
  //   .catch((e: any) => {
  //     console.log('> handleLoginClick -> error:', e.data.data);
  //     const data = e.data.data;
  //     errors.value.push(e.toString());
  //     let item, message;
  //     for (item in data) {
  //       message = `${item}: ${data[item].message}`;
  //       errors.value.push(message);
  //     }
  //   });
};
</script>

<template>
  <RegistrationForm 
    title="Login" 
    v-if="!isSuccess"
    :errors="errors"
    @login="handleLogin"
  >
    <RouterLink :to="Routes.REGISTER">
      <small>Register</small>
    </RouterLink>
  </RegistrationForm>
  <div v-else>
    <h1 style="color: lightgreen">User login successful</h1>
    <RouterLink :to="Routes.BOOKS"> Books </RouterLink>
    <RouterLink :to="Routes.INDEX"> Home </RouterLink>
  </div>
</template>

<style scoped></style>
