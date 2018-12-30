<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col bg-dark text-white">
        <div class="navbar-brand">SPORT STORE</div>
        <cart-summary />
      </div>
    </div>
    <div class="row">
      <div class="col-3 bg-info p-2">
        <category-controls />
        <button
          class="btn btn-block btn-warning mt-5"
          @click="setShowSearch(true)"
        >
          Pesquisar
        </button>
      </div>
      <div class="col-9 p-2">
        <Search />
        <product-list />
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import ProductList from "./ProductList";
import CategoryControls from "./CategoryControls";
import CartSummary from "./CartSummary";
import Search from "./Search";

export default {
  components: {
    ProductList,
    CategoryControls,
    CartSummary,
    Search
  },
  methods: {
    ...mapMutations(["setShowSearch"])
  }
};
</script>

