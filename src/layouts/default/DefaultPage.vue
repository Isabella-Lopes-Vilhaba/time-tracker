<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer">
      <v-img
        src="https://picsum.photos/1920/1080?random"
        gradient="to top right, rgba(19,84,122,.8), rgba(128,20,199,.8)"
        class="text-white text-center pt-5"
        cover
      >
        <v-avatar size="100">
          <v-img
            src="https://ingacode.com.br/img/logo.551d4488.png"
            alt="John"
          ></v-img>
        </v-avatar>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              Controle de Tarefas
            </v-list-item-title>
            <v-list-item-subtitle> IngaCode </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-img>
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
      cover
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
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    items: [
      {
        prependicon: "mdi-calendar-check-outline",
        title: "Tarefas",
        value: "tarefas",
        to: "/task",
      },
      {
        prependicon: "mdi-note-edit-outline",
        title: "Projetos",
        value: "projetos",
        to: "/projects",
      }
    ],
  }),
  created() {
    this.$router.push("/task");
    this.$store.dispatch("popularDatabase");
  },
};
</script>
