<script>
  import HelloWorld from './components/HelloWorld.vue'

  export default {
    name: 'App',
    components: {
      HelloWorld
    }
  }
  
</script>

<template>
  <div>
    <HelloWorld msg="Bonjour" />
    <div class="btn-group" role="group" aria-label="Basic example">
      <button type="button" class="btn btn-primary">Left</button>
      <button type="button" class="btn btn-secondary">Middle</button>
      <button type="button" class="btn btn-danger">Right</button>
    </div>
  </div>

</template>

<style lang="scss"></style>