import Axios from "axios";

const loginUrl = "http://localhost:3500/login";

export default {
  state: {
    authenticated: false,
    jwt: null
  },
  getters: {
    authenticatedAxios(state) {
      return Axios.create({
        headers: {
          Authorization: `Bearer<${state.jwt}>`
        }
      });
    }
  },
  mutations: {
    setAuthenticated(state, header) {
      state.jwt = header;
      state.authenticated = true;
    },
    clearAuthentication(state) {
      state.authenticated = false;
      state.jwt = null;
    }
  },
  actions: {
    async authenticate({ commit }, credentials) {
      const { data } = await Axios.post(loginUrl, credentials);
      if (data.success) commit("setAuthenticated", data.token);
    }
  }
};
