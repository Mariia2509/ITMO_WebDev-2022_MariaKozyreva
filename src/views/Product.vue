<template>
fghgjhkk
</template>

<script setup>
import {ref, onMounted } from "vue";
import {useRoute, useRouter} from 'vue-router'

const route = useRoute ()
const router = useRouter()

onMounted(() =>{
  console.log(route.params.id)


export default {
  name: "Product"
}

<style scoped>

</style>
}) </script>