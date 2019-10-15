const state = {
  token: localStorage.getItem("token") ? localStorage.getItem("token") : "", // 认证凭证'
  userName: "",
  roles: []
};

const mutations = {};

const actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
