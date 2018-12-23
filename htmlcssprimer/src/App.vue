<template>
  <div>
    <h4 class="bg-primary text-white text-center p-2">
      To Do List
    </h4>
    <table class="table table-striped table-bordered table-sm">
      <thead>
        <tr>
          <th>Tarefas</th>
          <th>Feito</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="t in tasks"
          :key="t.action"
        >
          <td>{{t.action}}</td>
          <td>{{t.done}}</td>
        </tr>
      </tbody>
    </table>

    <div class="form-group m-2">
      <label for="">Nova Tarefa: </label>
      <input
        type="text"
        v-model="newItemText"
        class="form-control"
      />
    </div>
    <div class="text-center">
      <button
        class="btn btn-primary"
        v-on:click="addNewTodo"
      >
        Adicionar
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      tasks: [
        { action: "Comprar Flores", done: false },
        { action: "Comprar Sapatos", done: false },
        { action: "Coletar Tickets", done: true },
        { action: "Ligar para o Joe", done: false }
      ],
      newItemText: ""
    };
  },
  methods: {
    addNewTodo() {
      this.tasks.push({
        action: this.newItemText,
        done: false
      });
      this.newItemText = "";
    }
  }
};
</script>