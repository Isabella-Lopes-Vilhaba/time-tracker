<template>
  <div>
    <drop-list :items="computedTasks" @reorder="$event.apply(computedTasks)">
      <template v-slot:item="{ item, reorder }">
        <drag :key="item.id" :data="item">
          <TaskComponent
            style="background-color: white"
            :style="
              reorder
                ? { borderLeft: '2px solid #1976D2', marginLeft: '-2px' }
                : {}
            "
            :task="item"
          />
          <v-divider />
        </drag>
      </template>
      <template v-slot:feedback> </template>
    </drop-list>
    <div
      v-if="!computedTasks.length && $store.state.tasks.length"
      class="mt-16 animate__animated animate__bounceInUp"
    >
      <center>
        <v-icon size="100" color="deep-purple-accent-1">mdi-check</v-icon>
        <div class="text-h5 text-deep-purple-accent-1">Nenhuma tarefa</div>
      </center>
    </div>
  </div>
</template>

<script>
import { Drag, DropList } from "vue-easy-dnd";
import TaskComponent from "./TaskComponent.vue";

export default {
  components: {
    Drag,
    DropList,
    TaskComponent,
  },
  props: {
    projectFilter: {
      type: Number,
      required: true,
      default: 0,
    },
    collaboratorFilter: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  data: function () {
    return {};
  },
  computed: {
    computedTasks() {
      const tasks = [...this.$store.state.tasks]
      if (this.projectFilter != 0 && this.collaboratorFilter == 0) {
        const filteredProject = tasks.filter(
          (task) =>
            task.projectId == this.projectFilter
        );
        return filteredProject
      }

      if (this.projectFilter == 0 && this.collaboratorFilter != 0) {
        const filteredCollaborator = tasks.filter(
          (task) =>
            task.collaboratorId == this.collaboratorFilter
        );
        return filteredCollaborator
      }

      if (this.projectFilter != 0 && this.collaboratorFilter != 0) {
        const filteredTasks = tasks.filter(
          (task) =>
            task.collaboratorId == this.collaboratorFilter && task.projectId == this.projectFilter
        );
        return filteredTasks
      }

      return [...this.$store.state.tasks];
    },
  },
};
</script>

<style></style>
