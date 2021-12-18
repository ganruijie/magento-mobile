import * as cartTypes from "@/store/types/cart/mutations";
import service from "@/modules/api";
const initState = () => ({
  orderOffer: {},
  refreshOffer: []
});

export default {
  namespaced: true,
  state: {
    ...initState()
  },
  getters: {},
  mutations: {
    [cartTypes.GET_ORDER_OFFER](state, value) {
      state.orderOffer = value;
    },
    [cartTypes.GET_REFRESH_OFFER](state, value) {
      state.refreshOffer = value;
    }
  },
  actions: {
    async getOrderOffer({ commit }, param) {
      return await service.post('/create-pre-order', param)
        .then(res => {
          const result = res.data;
          const { preOrder, offers, merchantName } = result;
          commit(cartTypes.GET_ORDER_OFFER, { preOrder, offers, merchantName });
          commit(cartTypes.GET_REFRESH_OFFER, offers);
        }).catch(() => {
          commit(cartTypes.GET_ORDER_OFFER, { });
        });
    },
    async getRefreshOffer({ commit }, param) {
      return await service.post('/refresh-offer', param).then(res => {
        const { offers } = res.data;
        commit(cartTypes.GET_REFRESH_OFFER, offers);
        return res;
      }).catch(() => {
        commit(cartTypes.GET_REFRESH_OFFER, []);
      })
    }
  }
};
