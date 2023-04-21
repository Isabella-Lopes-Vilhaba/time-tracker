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
        <v-chip
          class="ma-2 hide-sm"
          color="blue-lighten-1"
          :class="{ 'bg-white': task.done }"
          label
        >
          <v-icon start icon="mdi-account"></v-icon>
          {{ collaborators }}
        </v-chip>
        <v-chip
          class="ma-2 hide-sm"
          color="indigo-darken-1"
          :class="{ 'bg-white': task.done }"
          label
        >
          <v-icon start icon="mdi-cog-outline"></v-icon>
          {{ project }}
        </v-chip>
        <v-chip
          class="ma-2 hide-sm"
          color="purple-darken-4"
          :class="{ 'bg-white': task.done }"
          label
        >
          <v-icon start icon="mdi-clock-outline"></v-icon>
          {{ fullTime }}
        </v-chip>
        <v-btn
          v-if="!timerRunning"
          color="grey-darken-2"
          icon="mdi-play"
          variant="text"
          @click.stop="startTimer()"
        ></v-btn>
        <template v-else>
          <v-chip
            class="ma-2"
            color="deep-purple-accent-1"
            :class="{ 'bg-white': task.done }"
            label
          >
            <v-icon start icon="mdi-clock-outline"></v-icon>
            {{ formattedTime }}
          </v-chip>
          <v-btn
            color="grey-darken-2"
            icon="mdi-pause"
            variant="text"
            @click.stop="stopTimer()"
          ></v-btn>
        </template>
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
import ModalDelete from "./modal/ModalDelete";
import ModalEdit from "./modal/ModalEdit";

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
    timerRunning: false,
    startTime: 0,
    stopTime: 0,
    currentTime: 0,
    timeTracker: {
      id: null,
      startDate: null,
      endDate: null,
      timeZoneId: null,
      createdAt: null,
      updatedAt: null,
    },
  }),
  components: { ModalEdit, ModalDelete },
  computed: {
    formattedTime() {
      if (this.timerRunning) {
        const timeDifference = this.currentTime - this.startTime;
        const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24)
          .toString()
          .padStart(2, "0");
        const minutes = Math.floor((timeDifference / (1000 * 60)) % 60)
          .toString()
          .padStart(2, "0");
        const seconds = Math.floor((timeDifference / 1000) % 60)
          .toString()
          .padStart(2, "0");
        return `${hours}:${minutes}:${seconds}`;
      } else {
        return "00:00:00";
      }
    },
    fullTime() {
      const times = this.task.timeTrackers.map(
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
    collaborators() {
      const collaborator = Object.assign({}, this.$store.state.collaborators.find(collaborator => collaborator.id === this.task.collaboratorId));
      return  collaborator.name || "Sem colaborador"
    },
    project() {
      const project = Object.assign({}, this.$store.state.projects.find(project => project.id === this.task.projectId));
      return project.name || "Sem projeto"
    }
  },
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
    startTimer() {
      clearInterval(this.timer);
      this.startTime = Date.now();
      this.timerRunning = true;
      this.timer = setInterval(() => {
        this.currentTime = Date.now();
      }, 10);
    },
    stopTimer() {
      this.saveTimer();
      clearInterval(this.timer);
      this.timerRunning = false;
      this.currentTime = null;
      this.startTime = null;
    },
    saveTimer() {
      const now = Date.now();
      this.timeTracker.id = Date.now();
      this.timeTracker.startDate = this.startTime;
      this.timeTracker.endDate = now;
      this.timeTracker.timeZoneId =
        Intl.DateTimeFormat().resolvedOptions().timeZone;
      this.timeTracker.createdAt = now;
      this.timeTracker.updatedAt = now;
      this.addTimeTracker();
    },
    addTimeTracker() {
      this.$store.dispatch("addTimeTracker", {
        taskId: this.task.id,
        timeTracker: this.timeTracker,
      });
    },
  },
};
</script>

<style scoped>
@media screen and (max-width: 600px) {
  .hide-sm {
    display: none !important;
  }
}
</style>