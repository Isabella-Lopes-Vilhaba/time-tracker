<template>
  <v-container class="mt-8">
    <v-row justify="space-around">
      <v-col v-for="card in cards" :key="card" cols="12" md="3">
        <v-card class="mx-auto" max-width="250">
          <v-row class="d-flex align-center justify-center">
            <v-col cols="3" class="pl-6">
              <v-icon
                :icon="card.icon"
                color="deep-purple-accent-1"
                size="50"
              ></v-icon>
            </v-col>
            <v-col cols="9">
              <v-card-item class="pb-0 text-caption">
                {{ card.title }}
              </v-card-item>
              <v-card-text class="py-0 pb-2">
                <v-row align="center" no-gutters>
                  <v-col class="text-h5" cols="6"> {{ card.number }} </v-col>
                </v-row>
              </v-card-text>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    cards: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style></style>
