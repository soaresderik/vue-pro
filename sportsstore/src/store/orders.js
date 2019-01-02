import Vue from "vue";
import axios from "axios";

const ORDERS_URL = "http://localhost:3500/orders";

export default {
  state: {
    orders: []
  },
  mutations: {
    setOrders(state, data) {
      state.orders = data;
    },
    changeOrderShipped(state, order) {
      Vue.set(
        order,
        "shipped",
        order.shipped == null || !order.shipped ? true : false
      );
    }
  },
  actions: {
    async storeOrder({ rootState }, order) {
      order.cartLines = rootState.cart.lines;
      return (await axios.post(ORDERS_URL, order)).data.id;
    },
    async getOrders({ commit, rootGetters }) {
      commit(
        "setOrders",
        (await rootGetters.authenticatedAxios.get(ORDERS_URL)).data
      );
    },
    async updateOrder({ commit, rootGetters }, order) {
      commit("changeOrderShipped", order);
      await rootGetters.authenticatedAxios.put(
        `${ORDERS_URL}/${order.id}`,
        order
      );
    }
  }
};
