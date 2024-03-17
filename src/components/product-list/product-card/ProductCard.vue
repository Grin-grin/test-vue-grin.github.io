<template>
  <li class="product-card">
    <div v-if="product.price.old_price" class="product-card__sale">
      <span>Скидка</span>
    </div>
    <div class="product-card__img">
      <img :src="product.image.url" :alt="product.name" />
    </div>
    <div class="product-card__content product-card-content">
      <div class="product-card-content__header">
        <span class="product-card__code" v-if="product.code">
          {{ product.code }}
        </span>
      </div>
      <div class="product-card__title">
        <span>{{ product.name }}</span>
      </div>
      <div class="product-card-content__footer">
        <div class="product-card__price price">
          <span class="price__old" v-if="product.price.old_price">
            {{ numberFormat(product.price.old_price) }}&#8381;
          </span>
          <span>{{ numberFormat(product.price.current_price) }}&#8381;</span>
        </div>
        <div class="product-card__actions">
          <ProductButtonPurchase
            :product-id="product.id"
            :purchase="purchase"
          />
          <ProductButtonFavorites
            :product-id="product.id"
            :favorites="favorites"
          />
        </div>
      </div>
    </div>
  </li>
</template>

<script setup lang="ts">
import IProduct from "@/interfaces/product/IProduct";
import ProductButtonPurchase from "@/components/product-list/product-card/product-button/ProductButtonPurchase.vue";
import { ProductPurchaseEnum } from "@/components/product-list/product-card/ProductPurchaseEnum";
import ProductButtonFavorites from "@/components/product-list/product-card/product-button/ProductButtonFavorites.vue";
import { ProductFavoritesEnum } from "@/components/product-list/product-card/ProductFavoritesEnum";

interface ProductProps {
  product: IProduct;
  purchase?: ProductPurchaseEnum;
  favorites?: ProductFavoritesEnum;
}

withDefaults(defineProps<ProductProps>(), {
  purchase: ProductPurchaseEnum.PURCHASE,
  favorites: ProductFavoritesEnum.ADD_FAVORITES
});

function numberFormat(value) {
  return new Intl.NumberFormat().format(value);
}
</script>

<style scoped lang="scss">
.product-card {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 352px;
  padding: 0.5rem 0.875rem 0.25rem 0.75rem;
  border: 1px solid $app-color-light;

  @media screen and (max-width: 615px) {
    height: 296px;
  }

  &__sale {
    position: absolute;
    left: 0;
    color: $app-color-white;
    background: $app-color-red;
    padding: 3px 1rem;
  }

  &__img {
    img {
      max-width: 238px;
      width: 100%;
      margin: 0 auto;
      overflow: hidden;
      display: block;
      object-fit: cover;

      @media screen and (max-width: 615px) {
        max-width: 180px;
      }
    }
  }

  &__content {
    margin-top: auto;
    font-family: $app-ff-ui;
    letter-spacing: 0.2px;
  }

  &__title {
  }

  &__code {
    font-size: 0.625rem;
    color: $app-color-gray-second;
  }

  &__price {
    display: flex;
    gap: 0.625rem;
    margin-top: 0.375rem;

    .price {
      &__old {
        text-decoration: line-through;
        color: $app-color-gray-second;
      }
    }
  }

  &__actions {
    display: flex;
    gap: 0.7rem;

    button {
      padding: 7.2px;
    }
  }
}

.product-card-content__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
