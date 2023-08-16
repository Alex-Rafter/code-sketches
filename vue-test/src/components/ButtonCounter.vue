<script setup>
  defineProps(['id']);
  defineEmits(['some'])
</script>

<template>
  <button @click="$emit('some', 'tester')">click me</button>
</template>