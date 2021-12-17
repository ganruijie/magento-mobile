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
  mutations: {},
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
