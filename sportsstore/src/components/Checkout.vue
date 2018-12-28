<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="col bg-dark text-white">
          <a
            href=""
            class="navbar-brand"
          >SPORTS STORE</a>
        </div>
      </div>
    </div>

    <div class="m-2">
      <div class="form-group m-2">
        <label>Nome</label>
        <input
          type="text"
          v-model="$v.order.name.$model"
          class="form-control"
        >
        <validation-error :validation="$v.order.name" />
      </div>
    </div>

    <div class="m-2">
      <div class="form-group m-2">
        <label>E-mail</label>
        <input
          type="email"
          v-model="$v.order.email.$model"
          class="form-control"
        >
        <validation-error :validation="$v.order.email" />
      </div>
    </div>

    <div class="m-2">
      <div class="form-group m-2">
        <label>Endereço</label>
        <input
          type="text"
          v-model="$v.order.address.$model"
          class="form-control"
        >
        <validation-error :validation="$v.order.address" />
      </div>
    </div>

    <div class="m-2">
      <div class="form-group m-2">
        <label>Cidade</label>
        <input
          type="text"
          v-model="$v.order.city.$model"
          class="form-control"
        >
        <validation-error :validation="$v.order.city" />
      </div>
    </div>

    <div class="m-2">
      <div class="form-group m-2">
        <label>CEP</label>
        <input
          type="text"
          v-model="$v.order.zip.$model"
          class="form-control"
        >
        <validation-error :validation="$v.order.zip" />
      </div>
    </div>

    <div class="text-center">
      <router-link
        to="/cart"
        class="btn btn-secondary m-1"
      >Voltar</router-link>
      <button
        class="btn btn-primary m-1"
        @click="submitOrder"
      >Finalizar</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { required, email } from "vuelidate/lib/validators";
import ValidationError from "./ValidationError";

export default {
  components: { ValidationError },
  data: function() {
    return {
      order: { name: null, emial: null, address: null, city: null, zip: null }
    };
  },
  validations: {
    order: {
      name: { required },
      email: { required, email },
      address: { required },
      city: { required },
      zip: { required }
    }
  },
  methods: {
    ...mapActions({
      storeOrder: "storeOrder",
      clearCart: "cart/clearCartData"
    }),
    async submitOrder() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        console.log("Eiii");
        let order = await this.storeOrder(this.order);
        this.clearCart();
        this.$router.push(`/thanks/${order}`);
      }
    }
  }
};
</script>

