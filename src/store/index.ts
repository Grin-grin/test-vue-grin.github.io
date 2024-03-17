import { createStore } from "vuex";
import IProduct from "@/interfaces/product/IProduct";

export default createStore({
  state: {
    products: [] as Array<IProduct>
  },
  getters: {
    products(state) {
      return state.products;
    }
  },
  mutations: {
    ADD_PRODUCTS(state, products: Array<IProduct>) {
      state.products = products;
    }
  },
  actions: {
    addProducts({ commit }, products: Array<IProduct>) {
      commit("ADD_PRODUCTS", products);
    }
  },
  strict: true
});
