import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";

import CartModule from "./cart";
import OrdersModule from "./orders";

Vue.use(Vuex);

const baseUrl = "http://localhost:3500";
const productsUrl = `${baseUrl}/products`;
const categoriesUrl = `${baseUrl}/categories`;

export default new Vuex.Store({
  strict: true,
  modules: { cart: CartModule, orders: OrdersModule },
  state: {
    // products: [],
    categoriesData: [],
    // productsTotal: 0,
    currentPage: 1,
    pageSize: 4,
    currentCategory: "All"
  },
  getters: {
    // productsFilteredByCategory: state =>
    //   state.products.filter(
    //     p =>
    //       state.currentCategory == "All" || p.category == state.currentCategory
    //   ),
    processedProducts: state => {
      return state.pages[state.currentPage];
    },
    pageCount: state => state.serverPageCount,
    categories: state => ["Todas", ...state.categoriesData]
  },
  mutations: {
    _setCurrentPage(state, page) {
      state.currentPage = page;
    },
    _setPageSize(state, size) {
      state.pageSize = size;
      state.currentPage = 1;
    },
    _setCurrentCategory(state, category) {
      state.currentCategory = category;
      state.currentPage = 1;
    },
    // setData(state, data) {
    //   state.products = data.pdata;
    //   state.productsTotal = data.pdata.length;
    //   state.categoriesData = data.cdata.sort();
    // }
    addPage(state, page) {
      for (let i = 0; i < page.pageCount; i++) {
        Vue.set(
          state.pages,
          page.number + i,
          page.data.slice(
            i * state.pageSize,
            i * state.pageSize + state.pageSize
          )
        );
      }
    },
    clearPages(state) {
      state.pages.splice(0, state.pages.length);
    },
    setCategories(state, categories) {
      state.categoriesData = categories;
    },
    setPageCount(state, count) {
      state.serverPageCount = Math.ceil(Number(count) / state.pageSize);
    }
  },
  actions: {
    async getData({ dispatch, commit }) {
      await dispatch("getPage", 2);
      commit("setCategories", (await Axios.get(categoriesUrl)).data);
    },
    async getPage({ commit, state }, getPageCount = 1) {
      let url = `${productsUrl}?_page=${
        state.currentPage
      }&_limit=${state.pageSize * getPageCount}`;

      if (state.currentCategory != "Todas")
        url += `&category=${state.currentCategory}`;

      let response = await Axios.get(url);
      commit("setPageCount", response.headers["x-total-count"]);
      commit("addPage", {
        number: state.currentPage,
        data: response.data,
        pageCount: getPageCount
      });
    },
    setCurrentPage({ commit, state, dispatch }, page) {
      commit("_setCurrentPage", page);
      if (!state.pages[page]) dispatch("getPage");
    },
    setPageSize({ commit, dispatch }, size) {
      commit("clearPages");
      commit("_setPageSize", size);
      dispatch("getPage", 2);
    },
    setCurrentCategory({ commit, dispatch }, category) {
      commit("clearPages");
      commit("_setCurrentCategory", category);
      dispatch("getPage", 2);
    }
  }
});
