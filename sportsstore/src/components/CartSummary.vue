<template>
  <div class="float-right">
    <small>
      Seu Carrinho
      <span v-if="itemCount > 0">{{ itemCount }} item(s) {{ totalPrice | currency }}</span>
      <span v-else="">(vazio)</span>
    </small>
    <router-link
      to="/cart"
      class="btn btn-sm bg-dark text-white"
      v-bind:disabled="itemCount == 0"
    >
      <i class="fa fa-shopping-cart"></i>
    </router-link>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      itemCount: "cart/itemCount",
      totalPrice: "cart/totalPrice"
    })
  }
};
</script>
