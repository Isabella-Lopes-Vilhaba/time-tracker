<template>
  <v-list-item
    :class="{'bg-deep-purple-accent-1' :task.done}"
    @click="updateTask(task.id)"
    :value="task"
  >
    <template v-slot:prepend="">
      <v-list-item-action start>
        <v-checkbox-btn :model-value="task.done"></v-checkbox-btn>
      </v-list-item-action>
    </template>
    <v-list-item-title>{{ task.title }}</v-list-item-title>
    <template v-slot:append>
      <v-btn
        color="red-lighten-1"
        icon="mdi-trash-can"
        variant="text"
        @click.stop="handleRemoveTask(task.id)"
      ></v-btn>
    </template>
  </v-list-item>
  <v-divider></v-divider>
</template>

<script>
  export default {
    props: ['task'],
    data: () => ({
    }),
    methods: {
      updateTask(updatedTaskId) {
        this.$store.commit('updateTask', updatedTaskId)
      },
      handleRemoveTask(removedTaskId) {
        this.$store.commit('removeTask', removedTaskId)
      }
    }
  }
</script>