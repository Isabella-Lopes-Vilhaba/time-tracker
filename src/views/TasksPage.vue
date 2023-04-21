<template>
  <div>
    <v-row class="flex-row justify-space-between align-center">
      <v-card
        :max-width="400"
        class="w-100 bg-deep-purple-accent-1 ma-10 flex-row justify-center align-center pt-2 pb-2"
      >
        <v-row class="pa-2">
          <v-col cols="6" class="pa-0">
            <v-card-text class="text-center pt-2 pb-0 font-weight-bold"
              >Hoje</v-card-text
            >
            <v-card-text class="text-center pt-2 pb-2">{{ today }}</v-card-text>
          </v-col>
          <v-col cols="6" class="pa-0">
            <v-card-text class="text-center pt-2 pb-0 font-weight-bold"
              >Este mês</v-card-text
            >
            <v-card-text class="text-center pt-2 pb-2">{{
              thisMonth
            }}</v-card-text>
          </v-col>
        </v-row>
      </v-card>
      <v-container class="container mx-auto w-50 flex-row justify-space-around align-center mt-6">
        <v-row class="selects ma-2">
          <v-col cols="6" class="column">
            <v-select
              class="w-75 slect"
              :items="computedCollaborators"
              item-title="name"
              item-value="id"
              label="Colaborador"
              variant="outlined"
              v-model="collaborator"
            ></v-select>
          </v-col>
          <v-col cols="6">
            <v-select
              class="w-75 select"
              :items="computedProjects"
              item-title="name"
              item-value="id"
              label="projeto"
              variant="outlined"
              v-model="project"
            ></v-select>
          </v-col>
        </v-row>
      </v-container>
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
    <ListTasks :collaboratorFilter="collaborator" :projectFilter="project" />
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
    tasks: [],
    collaborator: 0,
    project: 0,
  }),
  computed: {
    today() {
      const today = new Date(Date.now()).toLocaleDateString();
      const tasks = this.$store.state.tasks;
      let filteredTimeTrackers = [];

      tasks.forEach((task) => {
        const taskTimeTrackerFiltered = task.timeTrackers.filter(
          (tracker) =>
            new Date(tracker.startDate).toLocaleDateString() === today
        );
        filteredTimeTrackers.push(...taskTimeTrackerFiltered);
      });
      const times = filteredTimeTrackers.map(
        (timeTracker) => timeTracker.endDate - timeTracker.startDate
      );
      const sum = times.reduce((total, time) => total + time, 0);

      const hours = Math.floor((sum / (1000 * 60 * 60)) % 24)
        .toString()
        .padStart(2, "0");
      const minutes = Math.floor((sum / (1000 * 60)) % 60)
        .toString()
        .padStart(2, "0");

      return `${hours}:${minutes}`;
    },
    thisMonth() {
      const today = new Date();
      const currentMonthYear = today.toLocaleDateString("en-US", {
        month: "2-digit",
        year: "numeric",
      });
      const tasks = this.$store.state.tasks;
      let filteredTimeTrackers = [];

      tasks.forEach((task) => {
        const taskTimeTrackerFiltered = task.timeTrackers.filter((tracker) => {
          const trackerMonthYear = new Date(
            tracker.startDate
          ).toLocaleDateString("en-US", { month: "2-digit", year: "numeric" });
          return trackerMonthYear === currentMonthYear;
        });
        filteredTimeTrackers.push(...taskTimeTrackerFiltered);
      });

      const times = filteredTimeTrackers.map(
        (timeTracker) => timeTracker.endDate - timeTracker.startDate
      );
      const sum = times.reduce((total, time) => total + time, 0);

      const hours = Math.floor((sum / (1000 * 60 * 60)) % 24)
        .toString()
        .padStart(2, "0");
      const minutes = Math.floor((sum / (1000 * 60)) % 60)
        .toString()
        .padStart(2, "0");
      return `${hours}:${minutes}`;
    },
    computedProjects() {
      return [{id: 0, name: "Todos"}, ...this.$store.state.projects];
    },
    computedCollaborators() {
      return [{id: 0, name: "Todos"}, ...this.$store.state.collaborators];
    },
  },
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

<style scoped>
@media (max-width: 600px) {
  .container {
    width: 100% !important;
  }
}
</style>
