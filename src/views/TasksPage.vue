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
