<template>
  <h1>App Counter</h1>
  <p v-for='i in [1,2,3]' class='counter-value' :key='i'>{{counter}}
  </p>
  <button v-on:click='counter++'>+</button>
  <button v-if='counter > 0' @click='counter--'>-</button>
</template>
<script>
export default {
  data() {
    return{
      counter: 0,
      innerHTML: `<h2>Hello</h2>`
    };
  },


}
</script>
<style scoped>
 p.counter-value{
   color: red;
   font-size: 2rem;
   font-weight: normal;
 }
</style>


