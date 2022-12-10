<template>
  <h1>App Counter</h1>
    <CounterValue class='counter' v-for="fruits in [{ index:1, text:'Clicked'},]" :title='fruits.text' :value ='counter' :key='fruits.index'/>

  <button v-on:click="onPlus">+</button>
  <button v-if='canRenderMinusVisible' @click='onMinus'>-</button>
</template>
<script>
import CounterValue from '@/components/CounterValue.vue';

export default {
  components: {
    CounterValue,
  },
  data() {
    return{
      counter: 0,
    };
  },
  computed: {
    canRenderMinusVisible(){
      return this.counter>0
    }
  },
  methods: {
    onPlus(){
      this.counter++;
    },
    onMinus(){
      this.counter--
    }
  }

}
</script>
<style lang='scss' scoped>
 .counter {

 }
</style>

