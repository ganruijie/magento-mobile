import * as orderTypes from "@/store/types/order/mutations";
import service from "@/modules/api";
const initState = () => ({
  orderDetail: {},
  orderResult: {}
});

export default {
  namespaced: true,
  state: {
    ...initState()
  },
  getters: {},
  mutations: {
    [orderTypes.GET_ORDER_DETAIL](state, value) {
      state.orderDetail = value;
    },
    [orderTypes.GET_ORDER_RESULT](state, value) {
      state.orderResult = value;
    }
  },
  actions: {
    async getOrderDetail({ commit }, param) {
      return await service.post('/order-detail', param)
        .then(res => {
          const resultOrder = res.data.order;
          commit(orderTypes.GET_ORDER_DETAIL, resultOrder);
          return resultOrder;
        }).catch(() => {
          commit(orderTypes.GET_ORDER_DETAIL, { });
        });;
    },
    async getOrderResult({dispatch, commit}, param) {
      return await dispatch('getOrderDetail', param).then(res => {
        const resultOrder = res;
        commit(orderTypes.GET_ORDER_RESULT, resultOrder);
        return resultOrder;
      }).catch(() => {
        commit(orderTypes.GET_ORDER_RESULT, {});
      });
    }
  }
};
