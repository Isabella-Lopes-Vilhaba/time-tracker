<template>
  <div>
    <v-dialog v-model="dialog" persistent width="1024">
      <v-card>
        <v-card-title>
          <span class="text-h5">Excluir</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text> Tem certeza que deseja excluir o projeto? </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red-darken-3"
            variant="text"
            @click="$emit('closeModal')"
          >
            Cancelar
          </v-btn>
          <v-btn color="grey-darken-2" variant="text" @click="deleteProject()">
            Excluir
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    project: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    dialog: true,
  }),
  methods: {
    deleteProject() {
      this.$store.dispatch("removeProject", this.project.id);
      this.$emit("closeModal");
    },
  },
};
</script>
