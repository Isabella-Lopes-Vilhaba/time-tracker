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
        Novo projeto
      </v-btn>
    </v-row>
    <ListProjects />
    <div
      v-if="!$store.state.projects.length"
      class="mt-16 animate__animated animate__bounceInUp"
    >
      <center>
        <v-icon size="100" color="deep-purple-accent-1">mdi-check</v-icon>
        <div class="text-h5 text-deep-purple-accent-1">Nenhum projeto</div>
      </center>
    </div>
    <ModalAdd v-if="modalAdd" @closeModal="closeModalAdd()" />
  </div>
</template>

<script>
import ListProjects from '@/components/project/ListProjects.vue';
import ModalAdd from '@/components/project/modal/ModalAdd.vue';
export default {
  name: "ProjectsPage",
  components: {
    ListProjects,
    ModalAdd
  },
  data: () => ({
    modalAdd: false
  }),
  methods: {
    openModalAdd() {
      this.modalAdd = true
    },
    closeModalAdd() {
      this.modalAdd = false
    },
  },
};
</script>
