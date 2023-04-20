<template>
  <div>
    <v-row class="justify-end">
      <v-btn
        class="ma-10 font-weight-bold"
        color="deep-purple-accent-1"
        append-icon="mdi-plus-thick"
        variant="outlined"
        @click="openModalAdd()"
      >
        Nova tarefa
      </v-btn>
    </v-row>
    <ListTasks />
    <div
      v-if="!$store.state.tasks.length"
      class="mt-16 animate__animated animate__bounceInUp"
    >
      <center>
        <v-icon size="100" color="deep-purple-accent-1">mdi-check</v-icon>
        <div class="text-h5 text-deep-purple-accent-1">Nenhuma tarefa</div>
      </center>
    </div>
    <ModalAdd v-if="modalAdd" @closeModal="closeModalAdd()" />
  </div>
</template>

<script>
import ListTasks from "@/components/task/ListTasks";
import ModalAdd from "@/components/task/modal/ModalAdd";
export default {
  name: "TasksPage",
  components: {
    ListTasks,
    ModalAdd,
  },
  data: () => ({
    modalAdd: false,
  }),
  methods: {
    openModalAdd() {
      this.modalAdd = true;
    },
    closeModalAdd() {
      this.modalAdd = false;
    },
  },
};
</script>
