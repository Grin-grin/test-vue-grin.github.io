<template>
  <div class="container">
    <Header />
    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import Header from "@/components/header/Header.vue";
</script>
