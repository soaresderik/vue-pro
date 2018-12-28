<template>
  <div class="m-2 text-center">
    <h2>Obrigado!</h2>
    <p>Obrigado por adquirir nossos produtos. O código da compra é #{{orderId}}</p>
    <p>Iremos entregar o mais breve possível.</p>
    <router-link
      to="/"
      class="btn btn-primary"
    >Retornar a loja</router-link>
  </div>
</template>

<script>
export default {
  computed: {
    orderId() {
      return this.$route.params.id;
    }
  }
};
</script>

