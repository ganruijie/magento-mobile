import * as orderTypes from "@/store/types/order/mutations";
import service from "@/modules/api";
const initState = () => ({
  orderDetail: {},
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
    }
  },
  actions: {
    getOrderDetail({ commit }, param) {
      return service.post('/order-detail', param)
        .then(res => {
          const resultOrder = res.data.order;
          commit(orderTypes.GET_ORDER_DETAIL, resultOrder);
          return resultOrder;
        }).catch(() => {
          commit(orderTypes.GET_ORDER_DETAIL, { });
        });;
    }
  }
};
