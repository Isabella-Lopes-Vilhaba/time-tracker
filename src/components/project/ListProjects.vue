<template>
  <div>
    <drop-list :items="computedProjects" @reorder="$event.apply(computedProjects)" class="mb-15">
      <template v-slot:item="{ item, reorder }">
        <drag :key="item.id" :data="item">
          <ProjectComponent
            style="background-color: white"
            :style="
              reorder
                ? { borderLeft: '2px solid #1976D2', marginLeft: '-2px' }
                : {}
            "
            :project="item"
          />
          <v-divider />
        </drag>
      </template>
      <template v-slot:feedback> </template>
    </drop-list>
  </div>
</template>

<script>
import { Drag, DropList } from "vue-easy-dnd";
import ProjectComponent from "./ProjectComponent.vue";

export default {
  components: {
    Drag,
    DropList,
    ProjectComponent,
  },
  data: function () {
    return {};
  },
  computed: {
    computedProjects() {
      return this.$store.state.projects;
    },
  },
};
</script>

<style></style>
