<template>
  <div>
    <router-link
      to="/admin/products/create"
      class="btn btn-primary my-2"
    >
      Criar Produto
    </router-link>
    <table class="table table-sm table-bordered">
      <thead>
        <th>#</th>
        <th>Nomes</th>
        <th>Categorias</th>
        <th class="text-right">Preço</th>
      </thead>
      <tbody>
        <tr
          v-for="p in products"
          :key="p.id"
        >
          <td>{{ p.id }}</td>
          <td>{{ p.name }}</td>
          <td>{{ p.category }}</td>
          <td class="text-right">{{ p.price | currency }}</td>
          <td class="text-center">
            <button
              class="btn btn-sm btn-danger mx-1"
              @click="removeProduct(p)"
            >Excluir</button>
            <button
              class="btn btn-sm btn-warning mx-1"
              @click="handleEdit(p)"
            >Editar</button>
          </td>
        </tr>
      </tbody>
    </table>
    <page-controls />
  </div>
</template>


<script>
import PageControls from "../PageControls";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    PageControls
  },
  computed: {
    ...mapGetters({
      products: "processedProducts"
    })
  },
  methods: {
    ...mapActions(["removeProduct"]),
    handleEdit(product) {
      this.$router.push(`/admin/products/edit/${product.id}`);
    }
  }
};
</script>
