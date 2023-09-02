<script setup>
import { onMounted, ref } from "vue";

const msg = ref("Hello World!");

(async () => {
    let myObject = await fetch("https://hello-world-odd-water-f2a8.alexrafteremail.workers.dev/");
    let x = await myObject.json();
    msg.value = x.msg;
})();

// async function fetcher(file) {
//   let myObject = await fetch(file);
//   let myText = await myObject.json();
//   return myText;
// }
</script>

<template>
  <main>
    <h1>{{ msg }}</h1>
  </main>
</template>
