<template>
  <ul class="product-list">
    <ProductCard
      v-for="product in props.products"
      :key="product.id"
      :product="product"
    />
  </ul>
</template>

<script setup lang="ts">
import ProductCard from "@/components/product-list/product-card/ProductCard.vue";

import IProduct from "@/interfaces/product/IProduct";
interface ProductsProps {
  products?: Array<IProduct>;
}
const props = withDefaults(defineProps<ProductsProps>(), {
  products: () => []
});
</script>

<style scoped lang="scss">
.product-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2.5rem 3rem;

  @media screen and (max-width: 1248px) {
    gap: 1.5rem 2rem;
  }

  @media screen and (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (max-width: 908px) {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
