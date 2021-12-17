import * as homeTypes from "@/store/types/home/mutations";
// import {} from "@/modules/api";
const initState = () => ({
  moduleList: []
});

export default {
  namespaced: true,
  state: {
    ...initState()
  },
  getters: {},
  mutations: {
    [homeTypes.GET_PAGE_MODULE](state, value) {
      state.moduleList = value;
    }
  },
  actions: {
    // getAddress({ commit }) {
    //   let param = {
    //     pageNo: 1,
    //     pageSize: 10
    //   };
    //   return getMyAddress(param)
    //     .then(resStatCmptPromisify)
    //     .then(res => {
    //       commit(homeTypes.GET_PAGE_MODULE, res.moduleList);
    //     });
    // }
  }
};
