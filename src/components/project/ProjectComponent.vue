<template>
  <div>
    <v-list-item
      :value="project"
    >
      <v-list-item-title>{{ project.name }}</v-list-item-title>
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
    <ModalEdit v-if="modalEdit" @closeModal="closeModalEdit()" :project="project" />
    <ModalDelete
      v-if="modalDelete"
      @closeModal="closeModalDelete()"
      :project="project"
    />
  </div>
</template>

<script>
import ModalDelete from "./modal/ModalDelete";
import ModalEdit from "./modal/ModalEdit";

export default {
  props: {
    project: {
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
