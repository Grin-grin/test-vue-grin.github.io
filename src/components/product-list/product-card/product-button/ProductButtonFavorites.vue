<template>
  <button class="btn-favorites" @click="onClickFavorites">
    <IconFavorites :class="computedClassIcon" />
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { IconFavorites } from "@/components/common/icons/index";
import { useStore } from "vuex";
import IProduct from "@/interfaces/product/IProduct";

interface ProductButtonProps {
  product: IProduct;
}

const props = withDefaults(defineProps<ProductButtonProps>(), {});

const store = useStore();

const canAdd = computed(() => {
  console.log(store.getters.isProductFavorite(props.product), "fav");
  return store.getters.isProductFavorite(props.product.id);
});

const computedClassIcon = computed(() => {
  let classIcon = ["btn-favorites__icon"];
  if (!canAdd.value) {
    classIcon.push("btn-favorites__icon_red");
  }

  return classIcon;
});

const onClickFavorites = () => {
  if (!canAdd.value) {
    store.dispatch("deleteStoreFavorites", props.product.id);
    return;
  }

  store.dispatch("addStoreFavorites", props.product);
};
</script>

<style scoped lang="scss">
.btn-favorites {
  &__icon_red {
    color: $app-color-red;
  }
}
</style>
