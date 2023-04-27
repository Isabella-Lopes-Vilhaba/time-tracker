<template>
  <v-card class="ma-10 px-5 py-8 w-50" min-width="350" max-width="500">
    <ChartLine
      id="chart-line"
      :options="chartOptions"
      :data="chartData"
      :style="myStyles"
    />
  </v-card>
</template>

<script>
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line as ChartLine } from 'vue-chartjs'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export default {
  components: { ChartLine },
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
