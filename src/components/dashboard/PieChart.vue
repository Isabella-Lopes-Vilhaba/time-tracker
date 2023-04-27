<template>
  <v-card class="ma-10 px-5 py-8 w-50" min-width="350" max-width="500">
    <Pie
      id="chart-pie"
      :options="chartOptions"
      :data="chartData"
      :style="myStyles"
    />
  </v-card>
</template>

<script>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "vue-chartjs";

ChartJS.register(ArcElement, Tooltip, Legend);

export default {
  components: { Pie },
  data() {
    return {};
  },
  props: {
    chartData: {
      type: Object,
      required: true,
    },
    chartOptions: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    myStyles() {
      return {
        // height: `${/* mutable height */}px`,
        width: "auto",
        position: "relative",
        responsive: true,
      };
    },
  },
};
</script>

<style></style>
