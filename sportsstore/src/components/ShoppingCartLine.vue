<template>
  <tr>
    <td>
      <input
        type="text"
        class="form-control-sm"
        style="width: 5em"
        :value="qvalue"
        :input="sendChangeEvent"
      >
    </td>
    <td>{{ line.product.name }}</td>
    <td class="text-right">{{ line.product.price | currency }}</td>
    <td class="text-right">
      {{ (line.quantity * line.product.price) | currency }}
    </td>
    <td class="text-center">
      <button
        class="btn btn-sm btn-danger"
        @click="sendRemoveEvent"
      >
        Excluir
      </button>
    </td>
  </tr>
</template>

<script>
export default {
  props: ["line"],
  data: function() {
    return {
      qvalue: this.line.quantity
    };
  },
  methods: {
    sendChangeEvent($event) {
      if ($event.target.value > 0) {
        this.$emit("quantity", Number($event.target.value));
        this.qvalue = $event.target.value;
      } else {
        this.$emit("quantity", 1);
        this.qvalue = 1;
        $event.target.value = this.qvalue;
      }
    },
    sendRemoveEvent() {
      this.$emit("remove", this.line);
    }
  }
};
</script>

