<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Controle de Tarefas
          </v-list-item-title>
          <v-list-item-subtitle> IngaCode </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :prepend-icon="item.prependicon"
          :title="item.title"
          :value="item.title"
          :to="item.to"
          link
        >
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      color="teal-darken-4"
      image="https://picsum.photos/1920/1080?random"
    >
      <template v-slot:image>
        <v-img
          gradient="to top right, rgba(19,84,122,.8), rgba(128,20,199,.8)"
        ></v-img>
      </template>

      <template v-slot:prepend>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      </template>

      <v-app-bar-title>Time Tracker</v-app-bar-title>
    </v-app-bar>

    <v-main>
      <TasksPage />
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import TasksPage from "@/views/TasksPage.vue";
export default {
  data: () => ({
    drawer: null,
    items: [
      {
        prependicon: "mdi-home-city",
        title: "Tarefas",
        value: "tarefas",
        to: "/ ",
      },
      {
        prependicon: "mdi-account",
        title: "Projetos",
        value: "projetos",
        to: "/projects",
      },
      {
        prependicon: "mdi-account",
        title: "Colaboradores",
        value: "colaboradores",
        to: "/collaborators",
      },
    ],
  }),
  components: { TasksPage },
};
</script>
