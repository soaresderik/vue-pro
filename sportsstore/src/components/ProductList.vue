<template>
  <div>
    <div
      class="card m-1 p-1 bg-light"
      v-for="p in products"
      :key="p.id"
    >
      <h4>{{p.name}} <span class="badge badge-pill badge-primary float-right">{{p.price | currency}}</span></h4>
      <div class="card-text b-white p-1">{{ p.description }}
        <button
          class="btn btn-success btn-sm float-right"
          @click="handleProductAdd(p)"
        >
          Comprar
        </button>
      </div>
    </div>
    <page-controls />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import PageControls from "./PageControls.vue";

export default {
  components: {
    PageControls
  },
  computed: {
    ...mapGetters({ products: "processedProducts" })
  },

  filters: {
    currency(value) {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
      }).format(value);
    }
  },
  methods: {
    ...mapMutations({ addProduct: "cart/addProduct" }),
    handleProductAdd(product) {
      this.addProduct(product);
      this.$router.push("/cart");
    }
  }
};
</script>
