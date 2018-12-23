<template>
  <div class="row mt-2">
    <div class="col form-group">
      <select
        name=""
        id=""
        class="form-control"
        @change="changePageSize"
      >
        <option value="4">4 por Página</option>
        <option value="8">8 por Página</option>
        <option value="12">12 por Página</option>
      </select>
    </div>
    <div
      v-if="pageCount > 1"
      class="text-right col"
    >
      <div class="btn-group mx-2">
        <button
          v-for="i in pageNumbers"
          :key="i"
          class="btn"
          v-bind:class="{ 'btn-primary' : i == currentPage }"
          @click="setCurrentPage(i)"
        >
          {{ i }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
  computed: {
    ...mapState(["currentPage"]),
    ...mapGetters(["pageCount"]),
    pageNumbers() {
      return [...Array(this.pageCount + 1).keys()].slice(1);
    }
  },
  methods: {
    ...mapMutations(["setCurrentPage", "setPageSize"]),
    changePageSize($event) {
      this.setPageSize(Number($event.target.value));
    }
  }
};
</script>

