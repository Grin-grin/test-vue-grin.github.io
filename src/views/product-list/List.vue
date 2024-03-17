<template>
  <div class="content">
    <h1>{{ title }}</h1>
    <ProductList :products="products" />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed, onMounted, ref } from "vue";
import ProductList from "@/components/product-list/ProductList.vue";
import store from "@/store";

const route = useRoute();
const title = ref(route.meta.title);
const products = computed(() => {
  return store.getters.products;
});

onMounted(() => {
  load();
});

const load = () => {
  fetch("data/items1.json")
    .then((response) => response.json())
    .then((data) => store.dispatch("addProducts", data));
};
</script>

<style scoped lang="scss">
.content {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  margin-bottom: 3rem;
}
</style>
