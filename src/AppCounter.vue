<template>
  <h1 ref='header'>App Counter</h1>
    <CounterValue class='counter'
                  v-for="fruits in [{ index:1, text:'Clicked'},]" :title='fruits.text' :value ='counter' :key='fruits.index'/>

  <button v-on:click="onPlus">+</button>
  <button v-if='canRenderMinusVisible' @click='onMinus'>-</button>
</template>
<script>
import CounterValue from '@/components/CounterValue.vue';

const LOCAL_KEY_COUNTER = 'counter'

const saveCounter = (value) => localStorage.setItem(LOCAL_KEY_COUNTER, value)
let counterWatcher = null;

export default {
  components: {
    CounterValue,
  },
  data() {
    return {
      counter: 0,
    };
  },
  created() {
    console.log('>created: ', this.counter);
    this.counter = localStorage.getItem('counter')||0;
    counterWatcher = this.$watch(
      ()=>this.counter,
      (oldValue, newValue)=>{
        saveCounter(newValue)
      },
    );
  },
  mounted() {
    console.log('>mounted: ', this.counter);
  },
  computed: {
canRenderMinusVisible() {
  return this.counter > 0
},
},
  methods: {
    onPlus(){
      this.counter++;
      // if(this.counter > 11) this.$destroy();
      console.log('> Counter -> onPlus:', this.counter);
    },
    onMinus(){
      this.counter--
      if (this.counter===0) {
        this.$refs.header.innerHTML = '<b>Header</b>'
      }
      console.log('> Counter -> onMinus:', this.counter)
    }
  },
  unmounted() {
    counterWatcher();
  },
}
</script>
<style lang='scss' scoped>
 .counter {
   color: green;
 }
 .alert{
   background-color: lightcoral;
 }
</style>

