<template>
  <div>
    <router-view :key="key" />
  </div>
</template>

<script setup>
import { ref, provide } from "vue";
const key = ref(0);
provide("key", key);
console.log(key);
</script>

<style lang="less" scoped></style>
