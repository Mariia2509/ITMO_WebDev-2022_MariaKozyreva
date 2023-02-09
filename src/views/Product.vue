<template>
  <div v-if="card" class="card flex flex-col justify-around p-4 text-gray-500">
    <div class="cursor-pointer">
      <div class="w-full h-48 max-h-48 p-4 mb-14 bg-white">
        <router-link :to="`/product/${card.id}`">
          <img class="w-full h-full object-contain" :src="card.image" :alt="card.title"
          /></router-link>
      </div>
      <div class="mb-2 text-sm font-bold text-black">{{ card.title }}</div>
      <div class="mb-4 text-md font-bold text-gray-500">$ {{ card.price.toFixed(2) }}</div>
      <div class="mb-4 text-md">
        {{ card.description }}
      </div>
      <div v-if="quantity > 0" class="mb-4 text-xl font-bold text-black">In cart: {{ quantity }}</div>
    </div>

    <div class="w-full lg:w-1/5 mb-10 gap-8 justify-between">
      <button
          v-if="quantity === 0"
          class="w-full py-2 px-4 text-black text-center bg-white border border-gray-400"
          @click="addCartList(card)"
      >
        Add
      </button>

      <div v-else class="grid grid-cols-2 gap-4 justify-between">
        <button
            class="py-2 px-4 text-black text-center bg-white border border-gray-400"
            @click="removeCartList(card.id)"
        >
          Delete
        </button>

        <button class="py-2 px-4 text-black text-center bg-white border border-gray-400" @click="addCartList(card)">
          Add
        </button>
      </div>
    </div>

    <back-button />
  </div>

  <div v-else class="mt-10 flex items-center justify-center space-x-2">
    <div class="w-24 h-24 rounded-full animate-spin border-2 border-solid border-gray-500 border-t-transparent"></div>
  </div>
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


}) </script>

<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>