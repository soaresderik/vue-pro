<template>
  <div class="m-2">
    <h4 class="bg-primary text-white text-center p-2">SportsStore Administração</h4>

    <h4
      v-if="showFailureMessage"
      class="bg-danger text-white text-center p-2 my-2"
    >
      Autenticação Falhou. Por favor, tente novamente.
    </h4>

    <div class="form-group">
      <label for="">Usuário</label>
      <input
        class="form-control"
        v-model="$v.username.$model"
      />
      <validation-error :validation="$v.username" />
    </div>
    <div class="form-group">
      <label for="">Senha</label>
      <input
        class="form-control"
        type="password"
        v-model="$v.password.$model"
      />
      <validation-error :validation="$v.password" />
    </div>
    <div class="text-center">
      <button
        class="btn btn-primary"
        @click="handleAuth"
      >Entrar</button>
    </div>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { mapActions, mapState } from "vuex";
import ValidationError from "../ValidationError";

export default {
  components: { ValidationError },
  data: function() {
    return {
      username: "admin",
      password: "secret",
      showFailureMessage: false
    };
  },
  computed: {
    ...mapState({ authenticated: state => state.auth.authenticated })
  },
  validations: {
    username: { required },
    password: { required }
  },
  methods: {
    ...mapActions(["authenticate"]),
    async handleAuth() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        await this.authenticate({
          name: this.username,
          password: this.password
        });

        if (this.authenticated) this.$router.push("/admin");
        else this.showFailureMessage = true;
      }
    }
  }
};
</script>

