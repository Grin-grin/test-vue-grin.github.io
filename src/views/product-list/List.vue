<template>
  <div class="content">
    <h1>{{ title }}</h1>
    <ProductList :products="products" />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import ProductList from "@/components/product-list/ProductList.vue";
import { useStore } from "vuex";

const route = useRoute();
const title = ref(route.meta.title);
const store = useStore();
const products = ref([]);

onMounted(() => {
  load();
});

const load = () => {
  fetch("data/items.json")
    .then((response) => response.json())
    .then((data) => {
      store.dispatch("addProducts", data);
      products.value = store.getters.products;
    });

  fetch("data/materials.json")
    .then((response) => response.json())
    .then((data) => store.dispatch("addMaterials", data));

  store.dispatch("loadStore");
};

// const onFilterUpdate = (id?: string) => {
//   products.value = store.getters.filterByMaterialProducts(id);
// }; //todo

/*const onSortUpdate = (sortKey?: string) => {
  products.value = store.getters.sortByProducts(sortKey);
};*/ // todo
</script>

<style scoped lang="scss">
.content {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  margin-bottom: 3rem;
}
</style>
