<template>
  <div>
    <v-dialog v-model="dialog" persistent width="1024">
      <v-card>
        <v-card-title>
          <span class="text-h5">Editar</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-form @submit.prevent>
            <v-text-field
              label="Nome*"
              variant="outlined"
              v-model="updatedProject.name"
              :rules="rules"
              required
            ></v-text-field>
            <small>* Indica os campos obrigatórios</small>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="red-darken-3"
                variant="text"
                @click="$emit('closeModal')"
              >
                Cancelar
              </v-btn>
              <v-btn
                color="grey-darken-2"
                type="submit"
                variant="text"
                @click="editProject()"
              >
                Salvar
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
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
    }
  },
  data: () => ({
    dialog: true,
    updatedProject: null,
    rules: [
      (value) => {
        if (value) return true;
        return "Campo obrigatório";
      },
    ]
  }),
  created() {
    this.updatedProject = Object.assign({}, this.project);
  },
  methods: {
    editProject() {
      if (this.updatedProject.name) {
        this.$store.dispatch("updateProject", this.updatedProject);
        this.$emit("closeModal");
      }
    },
  },
};
</script>
