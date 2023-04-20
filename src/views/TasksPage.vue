<template>
  <div>
    <v-col cols="12">
      <v-text-field
        v-model="inputField"
        label="Qual sua tarefa"
        variant="outlined"
        clearable
        @keyup.enter="handleAddTask"
      ></v-text-field>
    </v-col>
    <ListTasks />
    <div
      v-if="!$store.state.tasks.length"
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
import ListTasks from "@/components/task/ListTasks.vue";
export default {
  name: "TasksPage",
  components: {
    ListTasks,
  },
  data: () => ({
    inputField: null,
  }),
  created() {
    this.$store.commit("getTasks");
  },
  methods: {
    handleAddTask() {
      this.$store.dispatch("addTask", this.inputField);
      this.inputField = null;
    },
  },
};
</script>
