<template>
  <div>
    <v-dialog v-model="dialog" persistent width="1024">
      <v-card>
        <v-card-title>
          <span class="text-h5">Editar</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Nome*"
                  variant="outlined"
                  v-model="updatedTask.title"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  :items="['0-17', '18-29', '30-54', '54+']"
                  label="Projeto*"
                  variant="outlined"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Descrição"
                  variant="outlined"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>* Indica os campos obrigatórios</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red-darken-3"
            variant="text"
            @click="$emit('closeModal')"
          >
            Cancelar
          </v-btn>
          <v-btn color="grey-darken-2" variant="text" @click="editTask()">
            Salvar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    dialog: true,
    updatedTask: null,
  }),
  created() {
    this.updatedTask = Object.assign({}, this.task);
  },
  methods: {
    editTask() {
      this.$store.dispatch("updateTask", this.updatedTask);
      this.$emit("closeModal");
    },
  },
};
</script>
