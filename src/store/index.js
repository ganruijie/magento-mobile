import Vue from "vue";
import Vuex, { Store } from "vuex";
import createPersistedState from "vuex-persistedstate";
import cart from "./modules/cart/index.js";
import order from "./modules/order/index.js";
import * as types from "@/store/types/mutations";

Vue.use(Vuex);

const store = new Store({
  plugins: [
    createPersistedState({
      paths: [],
      storage: sessionStorage
    })
  ],
  modules: {
    cart,
    order
  }
});

export default store;
