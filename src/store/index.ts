import { createStore } from "vuex";
import IProduct from "@/interfaces/product/IProduct";
import IMaterial from "@/interfaces/materials/IMaterial";
import { SortEnum } from "@/enums/SortEnum";

export default createStore({
  state: {
    products: [] as Array<IProduct>,
    favorites: [] as Array<IProduct>,
    purchase: [] as Array<IProduct>,
    materials: [] as Array<IMaterial>,
    sort: SortEnum.SORT_DEFAULT as string,
    filterMaterial: -1
  },
  getters: {
    getProducts(state) {
      let products = state.products.map((item) => item);
      if (state.sort === SortEnum.SORT_ASC) {
        products = products.sort(
          (a, b) => a.price.current_price - b.price.current_price
        );
      } else if (state.sort === SortEnum.SORT_DESC) {
        products = products.sort(
          (a, b) => b.price.current_price - a.price.current_price
        );
      }
      if (state.filterMaterial > -1) {
        products = products.filter(
          (item) => item.material === state.filterMaterial
        );
      }

      return products;
    },

    getFilterId(state) {
      return state.filterMaterial;
    },

    getSortKey(state) {
      return state.sort;
    },

    isProductPurchase: (state) => (id: string) => {
      return state.purchase.findIndex((item) => item.id === id) === -1;
    },

    isProductFavorite: (state) => (id: string) => {
      return state.favorites.findIndex((item) => item.id === id) === -1;
    },

    getMaterials: (state) => {
      console.log(state.materials, "11");
      return state.materials;
    }
  },
  mutations: {
    ADD_PRODUCTS(state, products: Array<IProduct>) {
      state.products = products;
    },

    LOAD_STORE(state) {
      let storeFavorites = localStorage.getItem("favorites");
      let storePurchase = localStorage.getItem("purchase");

      if (storeFavorites) {
        state.favorites = JSON.parse(storeFavorites);
      }

      if (storePurchase) {
        state.purchase = JSON.parse(storePurchase);
      }
    },

    ADD_STORE_PURCHASE(state, product: IProduct) {
      state.purchase.push(product);
      localStorage.setItem("purchase", JSON.stringify(state.purchase));
    },

    ADD_STORE_FAVORITES(state, product: IProduct) {
      state.favorites.push(product);
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },

    DELETE_STORE_PURCHASE(state, id: string) {
      const index = state.purchase.findIndex((item) => item.id === id);

      if (index > -1) {
        state.purchase.splice(index, 1);
        localStorage.setItem("purchase", JSON.stringify(state.purchase));
      }
    },

    DELETE_STORE_FAVORITES(state, id: string) {
      const index = state.favorites.findIndex((item) => item.id === id);

      if (index > -1) {
        state.favorites.splice(index, 1);
        localStorage.setItem("favorites", JSON.stringify(state.favorites));
      }
    },

    ADD_MATERIALS(state, materials: Array<IMaterial>) {
      console.log(materials);
      state.materials = materials;
    },

    SET_SORT(state, sort: string) {
      state.sort = sort;
    },

    SET_FILTERS_MATERIALS(state, id: number) {
      state.filterMaterial = id;
    }
  },
  actions: {
    addProducts({ commit }, products: Array<IProduct>) {
      commit("ADD_PRODUCTS", products);
    },

    loadStore({ commit }) {
      commit("LOAD_STORE");
    },

    addStorePurchase({ commit }, product: IProduct) {
      commit("ADD_STORE_PURCHASE", product);
    },

    deleteStorePurchase({ commit }, id: string) {
      commit("DELETE_STORE_PURCHASE", id);
    },

    addStoreFavorites({ commit }, product: IProduct) {
      commit("ADD_STORE_FAVORITES", product);
    },

    deleteStoreFavorites({ commit }, id: string) {
      commit("DELETE_STORE_FAVORITES", id);
    },

    addMaterials({ commit }, materials: Array<IMaterial>) {
      commit("ADD_MATERIALS", materials);
    },

    setSort({ commit }, sort: SortEnum) {
      commit("SET_SORT", sort);
    },

    setFilterMaterials({ commit }, id: number) {
      commit("SET_FILTERS_MATERIALS", id);
    }
  },
  strict: true
});
