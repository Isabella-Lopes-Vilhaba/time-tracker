<template>
  <v-card class="ma-10 px-5 py-8 w-50" min-width="350" max-width="500">
    <Bar
      id="chart-bar"
      :options="chartOptions"
      :data="chartData"
      :style="myStyles"
    />
  </v-card>
</template>

<script>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default {
  components: { Bar },
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
