<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col bg-dark text-white">
        <a class="navbar-brand">SPORT STORE</a>
      </div>
    </div>
    <div class="row">
      <div class="col mt-2">
        <h2>Seu Carrinho</h2>
        <table class="table table-bordered table-striped p-2">
          <thead>
            <tr>
              <th>Quantidade</th>
              <th>Produtos</th>
              <th>Preço</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="lines.length == 0">
              <td
                colspan="4"
                class="text-center"
              >Seu carrinho esta vazio</td>
            </tr>
            <cart-line
              v-for="line in lines"
              :key="line.product.id"
              :line="line"
              @quantity="handleQuantityChange(line, $event)"
              :remove="remove"
            />
          </tbody>
          <tfoot v-if="lines.length > 0">
            <tr>
              <td
                colspan="3"
                class="text-right"
              >Total: </td>
              <td class="text-right">
                {{ totalPrice | currency }}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="text-center">
          <router-link
            to="/"
            class="btn btn-secondary m-1"
          >Continuar Comprando</router-link>
          <router-link
            to="/checkout"
            class="btn btn-primary m-1"
            :disabled="lines.length == 0"
          >Finalizar</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";
import CartLine from "./ShoppingCartLine";

export default {
  components: { CartLine },
  computed: {
    ...mapState({ lines: state => state.cart.lines }),
    ...mapGetters({ totalPrice: "cart/totalPrice" })
  },
  methods: {
    ...mapMutations({
      change: "cart/changeQuantity",
      remove: "cart/removeProduct"
    }),
    handleQuantityChange(line, $event) {
      this.change({ line, quantity: $event });
    }
  }
};
</script>

