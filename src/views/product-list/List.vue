<template>
  <div class="content">
    <h1>{{ title }}</h1>
    <div class="content__filter">
      <ProductSort
        :selected-sort="selectedSort"
        @update:selected-sort="onSortUpdate"
      />
      <ProductFilter
        :filters="filterMaterial"
        :selected-filter="selectedFilter"
        @update:selected-filter="onFilterUpdate"
      />
    </div>
    <ProductList :products="products" />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed, onMounted, ref } from "vue";
import ProductList from "@/components/product-list/ProductList.vue";
import { useStore } from "vuex";
import { SortEnum } from "@/enums/SortEnum";
import ProductSort from "@/components/product-list/product-sort/ProductSort.vue";
import ProductFilter from "@/components/product-list/product-filter/ProductFilter.vue";

const route = useRoute();
const title = ref(route.meta.title);
const store = useStore();
const products = computed(() => {
  console.log(store.getters.getProducts, "ss");
  return store.getters.getProducts;
});

const filterMaterial = computed(() => {
  return store.getters.getMaterials;
});

const selectedFilter = ref<number>(store.getters.getFilterId);
const selectedSort = ref<SortEnum>(store.getters.getSortKey);

onMounted(() => {
  load();
});

const load = () => {
  fetch("data/items.json")
    .then((response) => response.json())
    .then((data) => {
      store.dispatch("addProducts", data);
    });

  fetch("data/materials.json")
    .then((response) => response.json())
    .then((data) => store.dispatch("addMaterials", data));

  store.dispatch("loadStore");
};

const onFilterUpdate = (id: number) => {
  console.log(id);
  store.dispatch("setFilterMaterials", id);
  selectedFilter.value = id;
};

const onSortUpdate = (sortKey: SortEnum) => {
  store.dispatch("setSort", sortKey);
  selectedSort.value = sortKey;
};
</script>

<style scoped lang="scss">
.content {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  margin-bottom: 3rem;

  &__filter {
    display: flex;
    gap: 1.5rem;
  }
}
</style>
