<template>
  <div>
    <h4 class="bg-info text-white text-center p-2">Pedidos</h4>
    <div class="form-group text-center">
      <input
        type="checkbox"
        class="form-check-input"
        v-model="showShipped"
      />
      <label
        for=""
        class="form-check-label"
      >Mostrar Pedidos Enviados</label>
    </div>
    <table class="table table-sm-table-bordered">
      <thead>
        <tr>
          <th>#</th>
          <th>Nome</th>
          <th>Cidade, CEP</th>
          <th class="text-right">Total</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="displayOrders.length == 0">
          <td colspan="5">Não há pedidos</td>
        </tr>
        <tr
          v-for="o in displayOrders"
          :key="o.id"
        >
          <td>{{ o.id }}</td>
          <td>{{ o.name }}</td>
          <td>{{ `${o.city}, ${o.zip}` }}</td>
          <td class="text-right">{{ getTotal(o) | currency }}</td>
          <td class="text-center">
            <button class="btn-sm btn-danger">
              {{ o.shipped ? 'Não enviado' : 'Enviado'}}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  data() {
    return {
      showShipped: false
    };
  },
  computed: {
    ...mapState({ orders: state => state.orders.orders }),
    displayOrders() {
      return this.showShipped
        ? this.orders
        : this.orders.filter(o => o.shipped != true);
    }
  },
  methods: {
    ...mapMutations(["changeOrderShipped"]),
    ...mapActions(["getOrders", "updateOrder"]),
    getTotal(order) {
      if (order.cartLines != null && order.cartLines.length > 0)
        return order.cartLines.reduce(
          (total, line) => total + line.quantity * line.product.price,
          0
        );
      else return 0;
    },
    shipOrder(order) {
      this.updateOrder(order);
    },
    created() {
      this.getOrders();
    }
  }
};
</script>

