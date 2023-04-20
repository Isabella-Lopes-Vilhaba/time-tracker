<template>
  <div>
    <v-list-item
      :class="{ 'bg-deep-purple-accent-1': task.done }"
      @click="updateStatusTask(task)"
      :value="task"
    >
      <template v-slot:prepend="">
        <v-list-item-action start>
          <v-checkbox-btn :model-value="task.done"></v-checkbox-btn>
        </v-list-item-action>
      </template>
      <v-list-item-title>{{ task.title }}</v-list-item-title>
      <template v-slot:append>
        <v-btn
          color="grey-darken-2"
          icon="mdi-pencil"
          variant="text"
          @click.stop="openModalEdit()"
        ></v-btn>
        <v-btn
          color="red-lighten-1"
          icon="mdi-trash-can"
          variant="text"
          @click.stop="openModalDelete()"
        ></v-btn>
      </template>
    </v-list-item>
    <v-divider></v-divider>
    <ModalEdit v-if="modalEdit" @closeModal="closeModalEdit()" :task="task" />
    <ModalDelete
      v-if="modalDelete"
      @closeModal="closeModalDelete()"
      :task="task"
    />
  </div>
</template>

<script>
import ModalDelete from "../Modal/ModalDelete.vue";
import ModalEdit from "../Modal/ModalEdit.vue";

export default {
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    modalEdit: false,
    modalDelete: false,
  }),
  components: { ModalEdit, ModalDelete },
  methods: {
    updateStatusTask(updatedTask) {
      this.$store.dispatch("updateStatusTask", updatedTask);
    },
    openModalEdit() {
      this.modalEdit = true;
    },
    closeModalEdit() {
      this.modalEdit = false;
    },
    openModalDelete() {
      this.modalDelete = true;
    },
    closeModalDelete() {
      this.modalDelete = false;
    },
  },
};
</script>
