import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";

import CartModule from "./cart";
import OrdersModule from "./orders";
import AuthModule from "./auth";

Vue.use(Vuex);

const baseUrl = "http://localhost:3500";
const productsUrl = `${baseUrl}/products`;
const categoriesUrl = `${baseUrl}/categories`;

export default new Vuex.Store({
  strict: true,
  modules: { cart: CartModule, orders: OrdersModule, auth: AuthModule },
  state: {
    categoriesData: [],
    currentPage: 1,
    pages: [],
    pageSize: 4,
    currentCategory: "All",
    searchTerm: "",
    showSearch: false
  },
  getters: {
    processedProducts: state => {
      return state.pages[state.currentPage];
    },
    pageCount: state => state.serverPageCount,
    categories: state => ["All", ...state.categoriesData]
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
    },
    setShowSearch(state, show) {
      state.showSearch = show;
    },
    setSearchTerm(state, term) {
      state.searchTerm = term;
      state.currentPage = 1;
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

      if (state.currentCategory != "All")
        url += `&category=${state.currentCategory}`;

      if (state.searchTerm != "") {
        url += `&q=${state.searchTerm}`;
      }

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
    },
    search({ commit, dispatch }, term) {
      commit("setSearchTerm", term);
      commit("clearPages");
      dispatch("getPage", 2);
    },
    clearSearchTerm({ commit, dispatch }) {
      commit("setSearchTerm", "");
      commit("clearPages");
      dispatch("getPage", 2);
    }
  }
});
