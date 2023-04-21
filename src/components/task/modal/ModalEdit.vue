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
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Nome*"
                  variant="outlined"
                  v-model="updatedTask.title"
                  :rules="rules"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Descrição"
                  variant="outlined"
                  v-model="updatedTask.description"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6">
                <v-select
                  :items="computedProjects"
                  item-title="name"
                  item-value="id"
                  label="Projeto*"
                  variant="outlined"
                  v-model="updatedTask.projectId"
                  :rules="rules"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  :items="computedCollaborators"
                  item-title="name"
                  item-value="id"
                  label="Colaborador"
                  variant="outlined"
                  v-model="updatedTask.collaboratorId"
                ></v-select>
              </v-col>
            </v-row>
            <div v-if="updatedTask.timeTrackers.length">
              <v-card-subtitle class="mt-8 mb-5">Time Trackers</v-card-subtitle>
              <div
                v-for="(timeTracker, index) in timeTrackersList"
                :key="index"
              >
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      label="Data início"
                      variant="outlined"
                      type="datetime-local"
                      :value="formatDate(timeTracker.startDate)"
                      @input="
                        updatedTask.timeTrackers[index].startDate = new Date(
                          $event.target.value
                        ).getTime()
                      "
                      :rules="[validateEndDate(index)]"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      label="Data fim"
                      variant="outlined"
                      type="datetime-local"
                      :value="formatDate(timeTracker.endDate)"
                      @input="
                        updatedTask.timeTrackers[index].endDate = new Date(
                          $event.target.value
                        ).getTime()
                      "
                      :rules="[validateEndDate(index)]"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </div>
            </div>
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
                @click="editTask()"
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
    task: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    dialog: true,
    updatedTask: null,
    rules: [
      (value) => {
        if (value) return true;
        return "Campo obrigatório";
      },
    ],
    teste: null,
    correctData: true
  }),
  created() {
    this.updatedTask = Object.assign({}, this.task);
  },
  computed: {
    computedProjects() {
      return [...this.$store.state.projects];
    },
    computedCollaborators() {
      return [...this.$store.state.collaborators];
    },
    timeTrackersList() {
      return this.updatedTask.timeTrackers;
    },
    formatDate() {
      // 2023-03-29T08:09
      return function (startDate) {
        const date = new Date(startDate);
        return `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(
          -2
        )}-${("0" + date.getDate()).slice(-2)}T${("0" + date.getHours()).slice(
          -2
        )}:${("0" + date.getMinutes()).slice(-2)}`;
      };
    },
  },
  methods: {
    editTask() {
      if (this.updatedTask.title && this.updatedTask.projectId && this.correctData) {
        this.$store.dispatch("updateTask", this.updatedTask);
        this.$emit("closeModal");
      }
    },
    validateEndDate(index) {
      return () => {
        if (
          this.updatedTask.timeTrackers[index].endDate >=
          this.updatedTask.timeTrackers[index].startDate
        ) {
          this.correctData = true
          return true;
        }
        this.correctData = false
        return "A data fim deve ser maior que a data início";
      };
    },
  },
};
</script>
