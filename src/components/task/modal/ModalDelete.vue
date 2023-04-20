<template>
  <div>
    <v-dialog v-model="dialog" persistent width="1024">
      <v-card>
        <v-card-title>
          <span class="text-h5">Excluir</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text> Tem certeza que deseja excluir a tarefa? </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red-darken-3"
            variant="text"
            @click="$emit('closeModal')"
          >
            Cancelar
          </v-btn>
          <v-btn color="grey-darken-2" variant="text" @click="deleteTask()">
            Excluir
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
  }),
  methods: {
    deleteTask() {
      this.$store.dispatch("removeTask", this.task.id);
      this.$emit("closeModal");
    },
  },
};
</script>
