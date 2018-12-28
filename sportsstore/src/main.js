import Vue from "vue";
import App from "./App.vue";
import Vuelidate from "vuelidate";

import store from "./store";
import router from "./router";

Vue.config.productionTip = false;

import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

Vue.filter("currency", value =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(value)
);

Vue.use(Vuelidate);

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
