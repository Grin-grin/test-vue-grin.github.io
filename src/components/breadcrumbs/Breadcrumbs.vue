<template>
  <ul class="breadcrumbs">
    <Breadcrumb
      v-for="(item, index) in breadcrumbs"
      :key="index"
      :breadcrumb="item"
    />
  </ul>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Breadcrumb from "@/components/breadcrumbs/inner-components/Breadcrumb.vue";
import { useRoute } from "vue-router";

const route = useRoute();
const breadcrumbs = computed(() => {
  return route.meta.breadcrumbs;
});
</script>

<style lang="scss" scoped>
.breadcrumbs {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-family: $app-ff-pro;
}
</style>
