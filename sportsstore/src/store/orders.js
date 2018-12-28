import axios from "axios";

const ORDERS_URL = "http://localhost:3500/orders";

export default {
  actions: {
    async storeOrder({ rootState }, order) {
      order.cartLines = rootState.cart.lines;
      return (await axios.post(ORDERS_URL, order)).data.id;
    }
  }
};
