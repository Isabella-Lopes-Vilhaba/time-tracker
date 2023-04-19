<template>
  <div>
    <v-col
      cols="12"
    >
      <v-text-field
        v-model="inputField"
        label="Qual sua tarefa"
        variant="outlined"
        clearable
        @keyup.enter="handleAddTask"
      ></v-text-field>
    </v-col>
    <v-list select-strategy="classic">
      <div
        v-for="task, index in $store.state.tasks"
        :key="index"
      >
        <TaskComponent
          :task="task"
        />
      </div>
    </v-list>
  </div>
</template>

<script>
  import TaskComponent from '@/components/task/TaskComponent.vue';
  export default {
    name: 'TasksPage',
    components: {
      TaskComponent
    },
    data: () => ({
        inputField: null
    }),
    methods: {
      handleAddTask() {
        this.$store.commit('addTask', this.inputField)
        this.inputField = null
      }
    }
  }
</script>