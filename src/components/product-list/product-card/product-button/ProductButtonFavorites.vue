<template>
  <button @click="onClickFavorites">
    <img src="@/assets/svg/favorites.svg" alt="" />
  </button>
</template>

<script setup lang="ts">
import { ProductFavoritesEnum } from "@/components/product-list/product-card/ProductFavoritesEnum";
import { computed } from "vue";

interface ProductButtonProps {
  productId: string;
  favorites: ProductFavoritesEnum;
}

const props = withDefaults(defineProps<ProductButtonProps>(), {});

const canAdd = computed(() => {
  return props.favorites === ProductFavoritesEnum.ADD_FAVORITES;
});

const canDelete = computed(() => {
  return props.favorites === ProductFavoritesEnum.DELETE_FAVORITES;
});

const onClickFavorites = () => {
  console.log(props.productId, props.favorites);
  if (canAdd.value) {
    console.log("в избранном");
    return;
  }

  if (canDelete.value) {
    console.log("удалена из избранного");
  }
};
</script>

<style scoped lang="scss"></style>
