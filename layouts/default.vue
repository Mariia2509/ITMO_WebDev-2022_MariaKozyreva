<template>
  <div>
   Nuxt Application
    <slot name="navigation"/>
      <slot />
  </div>
</template>

<script>
export default {
  name: "default"
}
</script>

<style scoped>

</style>