<template>
  <div>
    <v-dialog v-model="dialog" persistent width="1024">
      <v-card>
        <v-card-title>
          <span class="text-h5">Nova tarefa</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-form @submit.prevent>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Nome*"
                  variant="outlined"
                  v-model="task.title"
                  :rules="rules"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  :items="['Projeto 1', 'Projeto 2', 'Projeto 3', 'Projeto 4']"
                  label="Projeto*"
                  variant="outlined"
                  v-model="task.projectId"
                  :rules="rules"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Descrição"
                  variant="outlined"
                  v-model="task.description"
                ></v-text-field>
              </v-col>
            </v-row>
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
                @click="addTask()"
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
    task: {
      title: null,
      description: null,
      projectId: null
    },
    rules: [
      (value) => {
        if (value) return true;
        return "Campo obrigatório";
      },
    ],
  }),
  methods: {
    addTask() {
      if (this.task.title && this.task.projectId) {
        this.$store.dispatch("addTask", this.task);
        this.$emit("closeModal");
      }
    },
  },
};
</script>
