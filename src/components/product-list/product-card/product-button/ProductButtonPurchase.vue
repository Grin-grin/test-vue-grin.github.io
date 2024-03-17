<template>
  <button @click="onClickPurchase">
    <img v-if="canAdd" src="@/assets/svg/shopping.svg" :alt="props.purchase" />
    <img v-else src="@/assets/svg/done.svg" :alt="props.purchase" />
  </button>
</template>

<script setup lang="ts">
import { ProductPurchaseEnum } from "@/components/product-list/product-card/ProductPurchaseEnum";
import { computed } from "vue";

interface ProductButtonProps {
  productId: string;
  purchase: ProductPurchaseEnum;
}

const props = withDefaults(defineProps<ProductButtonProps>(), {});

const canAdd = computed(() => {
  return props.purchase === ProductPurchaseEnum.PURCHASE;
});

const canDelete = computed(() => {
  return props.purchase === ProductPurchaseEnum.DELETE_PURCHASE;
});
const onClickPurchase = () => {
  if (canAdd.value) {
    console.log("в корзине");
    localStorage.setItem("cart", props.productId);
  }
  if (canDelete.value) {
    console.log("удалена");
  }
  console.log(props.productId, props.purchase);
};
</script>

<style scoped lang="scss"></style>
