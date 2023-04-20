<template>
  <div>
    <v-dialog v-model="dialog" persistent width="1024">
      <v-card>
        <v-card-title>
          <span class="text-h5">Novo projeto</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-form @submit.prevent>
            <v-text-field
              label="Nome*"
              variant="outlined"
              v-model="project.name"
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
                @click="addProject()"
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
  data: () => ({
    dialog: true,
    project: {
      name: null,
    },
    rules: [
      (value) => {
        if (value) return true;
        return "Campo obrigatório";
      },
    ],
  }),
  methods: {
    addProject() {
      if (this.project.name) {
        this.$store.dispatch("addProject", this.project);
        this.$emit("closeModal");
      }
    },
  },
};
</script>
