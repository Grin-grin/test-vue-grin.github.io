<template>
  <button class="btn-purchase" @click="onClickPurchase">
    <component :is="renderIcon" :class="computedClassIcon" />
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { IconDone, IconShopping } from "@/components/common/icons/index";
import { useStore } from "vuex";
import IProduct from "@/interfaces/product/IProduct";

interface ProductButtonProps {
  product: IProduct;
}

const props = withDefaults(defineProps<ProductButtonProps>(), {});

const store = useStore();

const canAdd = computed(() => {
  return store.getters.isProductPurchase(props.product.id);
});

const renderIcon = computed(() => {
  if (canAdd.value) {
    return IconShopping;
  }

  return IconDone;
});

const computedClassIcon = computed(() => {
  let classIcon = ["btn-purchase__icon"];
  if (!canAdd.value) {
    classIcon.push("btn-purchase__icon_green");
  }

  return classIcon;
});
const onClickPurchase = () => {
  if (!canAdd.value) {
    store.dispatch("deleteStorePurchase", props.product.id);
    return;
  }

  store.dispatch("addStorePurchase", props.product);
};
</script>

<style scoped lang="scss">
.btn-purchase {
  &__icon_green {
    color: $app-color-green;
  }
}
</style>
