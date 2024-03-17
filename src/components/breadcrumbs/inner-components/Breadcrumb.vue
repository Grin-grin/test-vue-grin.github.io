<template>
  <li class="breadcrumb breadcrumb-link" v-if="breadcrumb.href">
    <router-link :to="breadcrumb.href">{{ breadcrumb.name }}</router-link>
    <span>/</span>
  </li>
  <li class="breadcrumb" v-else>
    <span>{{ breadcrumb.name }}</span>
  </li>
</template>

<script setup lang="ts">
import IBreadcrumb from "@/components/breadcrumbs/model/IBreadcrumb";

interface BreadcrumbProps {
  breadcrumb: IBreadcrumb;
}

defineProps<BreadcrumbProps>();
</script>

<style lang="scss" scoped>
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.breadcrumb-link {
  color: $app-color-gray;
}
</style>
