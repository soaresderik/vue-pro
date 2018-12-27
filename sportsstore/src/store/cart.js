export default {
  namespaced: true,
  state: {
    lines: []
  },
  getters: {
    itemCount: state =>
      state.lines.reduce((total, line) => total + line.quantity, 0),
    totalPrice: state =>
      state.lines.reduce(
        (total, line) => total + line.quantity * line.product.price,
        0
      )
  },
  mutations: {
    addProduct(state, product) {
      let line = state.lines.find(line => line.product.id == product.id);
      if (line != null) line.quantity++;
      else state.lines.push({ product, quantity: 1 });
    },
    changeQuantity(state, update) {
      update.line.quantity = update.quantity;
    },
    removeProduct(state, lineToRemove) {
      let index = state.lines.findIndex(line => line == lineToRemove);
      if (index > -1) state.lines.splice(index, 1);
    },
    setCartData(state, data) {
      state.lines = data;
    }
  },
  actions: {
    loadCartData(context) {
      let data = localStorage.getItem("cart");
      if (data != null) context.commit("setCartData", JSON.parse(data));
    },
    storeCartData({ state }) {
      localStorage.setItem("cart", JSON.stringify(state.lines));
    },
    clearCartData({ commit }) {
      commit("setCartData", []);
    },
    initializeCart({ dispatch }, store) {
      dispatch("loadCartData");
      store.watch(state => state.cart.lines, () => dispatch("storeCartData"), {
        deep: true
      });
    }
  }
};
