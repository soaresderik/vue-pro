<template>
  <div
    v-if="showSearch"
    class="row my-2"
  >
    <label
      for=""
      class="col-2 col-form-label text-right"
    >Pesquisar: </label>
    <input
      type="search"
      class="col form-control"
      :value="searchTerm"
      @input="doSearch"
      placeholder="Digite o termo de pesquisa..."
    />
    <button
      class="col-1 btn btn-sm btn-secondary mx-4"
      @click="handleClose"
    >Fechar</button>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState(["showSearch", "searchTerm"])
  },
  methods: {
    ...mapMutations(["setShowSearch"]),
    ...mapActions(["clearSearchTerm", "search"]),
    handleClose() {
      this.clearSearchTerm();
      this.setShowSearch(false);
    },
    doSearch($event) {
      this.search($event.target.value);
    }
  }
};
</script>
