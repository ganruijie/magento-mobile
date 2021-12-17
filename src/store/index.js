import Vue from "vue";
import Vuex, { Store } from "vuex";
import createPersistedState from "vuex-persistedstate";
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
  state: {
    authorPhone: null,
    loginToken: null
  },
  mutations: {
    [types.SET_PHONE](state, value) {
      state.authorPhone = value;
    }
  },
  actions: {
    setPhone({ commit }, value) {
      commit(types.SET_PHONE, value);
    }
  },
  modules: {
    order
  }
});

export default store;
