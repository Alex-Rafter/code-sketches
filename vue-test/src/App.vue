<script setup>
import { ref, onMounted } from 'vue';
import ButtonCounter from '@/components/ButtonCounter.vue'

const bool = ref(false)
const thingy = ref(1)
const thingyChanger = (val) => {
  // thingy.value = val
  bool.value = !bool.value
}

onMounted(() => console.log('thingy.value', thingy.value))


</script>

<template>
	<h1 :class="{'title' : bool}">Here are {{thingy}} child components!</h1>
  <ButtonCounter id="btnClicker" @some="thingyChanger(30)" />
</template>

<style>
  h1 {
    color: red;
  }

  h1.title {
    color: blue;
  }
</style>