<template>
  <div class="row mt-2">
    <div class="col-3 form-group">
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
    <div class="text-right col">
      <button
        :disabled="currentPage == 1"
        @click="setCurrentPage(currentPage - 1)"
        class="btn btn-secondary mx-1"
      >Anterior</button>
      <span v-if="currentPage > 4">
        <button
          @click="setCurrentPage(1)"
          class="btn btn-secondary mx-1"
        >1</button>
        <span class="h4">...</span>
      </span>
      <span class="mx-1">
        <button
          v-for="i in pageNumbers"
          :key="i"
          class="btn btn-secondary"
          :class="{ 'btn-info' : i == currentPage}"
          @click="setCurrentPage(i)"
        >{{ i }}</button>
      </span>
      <span v-if="currentPage <= pageCount - 4">
        <span class="h4">...</span>
        <button
          @click="setCurrentPage(pageCount)"
          class="btn btn-secondary mx-1"
        >{{ pageCount }}</button>
      </span>
      <button
        :disabled="currentPage == pageCount"
        @click="setCurrentPage(currentPage + 1)"
        class="btn btn-secondary mx-1"
      >Próximo</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapState(["currentPage"]),
    ...mapGetters(["pageCount"]),
    pageNumbers() {
      if (this.pageCount < 4)
        return [...Array(this.pagaCount + 1).keys()].slice(1);
      else if (this.currentPage <= 4) return [1, 2, 3, 4, 5];
      else if (this.currentPage > this.pageCount - 4)
        return [...Array(5).keys()].reverse().map(v => this.pageCount - v);
      else
        return [this.currentPage - 1, this.currentPage, this.currentPage + 1];
    }
  },
  methods: {
    ...mapActions(["setCurrentPage", "setPageSize"]),
    changePageSize($event) {
      this.setPageSize(Number($event.target.value));
    }
  }
};
</script>

