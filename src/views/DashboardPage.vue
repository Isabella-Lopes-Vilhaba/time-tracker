<template>
  <div>
    <CardsData :cards="cards" />
    <div
      v-if="!$store.state.tasks.length"
      class="mt-16 animate__animated animate__bounceInUp"
    >
      <center>
        <v-icon size="100" color="deep-purple-accent-1">mdi-check</v-icon>
        <div class="text-h5 text-deep-purple-accent-1">
          Adicione tarefas para ver os gráficos
        </div>
      </center>
    </div>
    <div v-else>
      <v-row justify="space-around">
        <LineChart :chartOptions="lineOptions" :chartData="lineData" />
        <BarChart :chartOptions="barOptions" :chartData="barData" />
      </v-row>
      <v-row justify="space-around">
        <PieChart :chartOptions="pieOptions" :chartData="pieData" />
        <RadarChart :chartOptions="radarOptions" :chartData="radarData" />
      </v-row>
    </div>
  </div>
</template>

<script>
import PieChart from "@/components/dashboard/PieChart.vue";
import CardsData from "@/components/dashboard/CardsData.vue";
import RadarChart from "@/components/dashboard/RadarChart.vue";
import LineChart from "@/components/dashboard/LineChart.vue";
import BarChart from "@/components/dashboard/BarChart.vue";

export default {
  components: { PieChart, CardsData, RadarChart, LineChart, BarChart },
  data: () => ({}),
  computed: {
    activeToday() {
      const day = new Date(Date.now()).toLocaleDateString();
      const tasks = this.$store.state.tasks;
      let filteredTimeTrackers = [];

      tasks.forEach((task) => {
        const taskTimeTrackerFiltered = task.timeTrackers.filter(
          (tracker) => new Date(tracker.startDate).toLocaleDateString() === day
        );
        filteredTimeTrackers.push(...taskTimeTrackerFiltered);
      });
      const times = filteredTimeTrackers.map(
        (timeTracker) => timeTracker.endDate - timeTracker.startDate
      );
      const sum = times.reduce((total, time) => total + time, 0);

      const hours = Math.floor((sum / (1000 * 60 * 60)) % 24)
        .toString()
        .padStart(2, "0");
      const minutes = Math.floor((sum / (1000 * 60)) % 60)
        .toString()
        .padStart(2, "0");

      return `${hours}:${minutes}`;
    },
    activeThisWeek() {
      const today = new Date(Date.now());
      const dayIndex = today.getDay();
      let hours = [];

      switch (dayIndex) {
        case 0:
          // Sun
          hours = [
            this.activeTime(today),
            this.activeTime(this.dateLaterDays(today, 1)),
            this.activeTime(this.dateLaterDays(today, 2)),
            this.activeTime(this.dateLaterDays(today, 3)),
            this.activeTime(this.dateLaterDays(today, 4)),
            this.activeTime(this.dateLaterDays(today, 5)),
            this.activeTime(this.dateLaterDays(today, 6)),
          ];
          break;
        case 1:
          // Mon
          hours = [
            this.activeTime(this.dateLaterDays(today, -1)),
            this.activeTime(today),
            this.activeTime(this.dateLaterDays(today, 1)),
            this.activeTime(this.dateLaterDays(today, 2)),
            this.activeTime(this.dateLaterDays(today, 3)),
            this.activeTime(this.dateLaterDays(today, 4)),
            this.activeTime(this.dateLaterDays(today, 5)),
          ];
          break;
        case 2:
          // Tue
          hours = [
            this.activeTime(this.dateLaterDays(today, -2)),
            this.activeTime(this.dateLaterDays(today, -1)),
            this.activeTime(today),
            this.activeTime(this.dateLaterDays(today, 1)),
            this.activeTime(this.dateLaterDays(today, 2)),
            this.activeTime(this.dateLaterDays(today, 3)),
            this.activeTime(this.dateLaterDays(today, 4)),
          ];
          break;
        case 3:
          // Wed
          hours = [
            this.activeTime(this.dateLaterDays(today, -3)),
            this.activeTime(this.dateLaterDays(today, -2)),
            this.activeTime(this.dateLaterDays(today, -1)),
            this.activeTime(today),
            this.activeTime(this.dateLaterDays(today, 1)),
            this.activeTime(this.dateLaterDays(today, 2)),
            this.activeTime(this.dateLaterDays(today, 3)),
          ];
          break;
        case 4:
          // Thu
          hours = [
            this.activeTime(this.dateLaterDays(today, -4)),
            this.activeTime(this.dateLaterDays(today, -3)),
            this.activeTime(this.dateLaterDays(today, -2)),
            this.activeTime(this.dateLaterDays(today, -1)),
            this.activeTime(today),
            this.activeTime(this.dateLaterDays(today, 1)),
            this.activeTime(this.dateLaterDays(today, 2)),
          ];
          break;
        case 5:
          // Fri
          hours = [
            this.activeTime(this.dateLaterDays(today, -5)),
            this.activeTime(this.dateLaterDays(today, -4)),
            this.activeTime(this.dateLaterDays(today, -3)),
            this.activeTime(this.dateLaterDays(today, -2)),
            this.activeTime(this.dateLaterDays(today, -1)),
            this.activeTime(today),
            this.activeTime(this.dateLaterDays(today, 1)),
          ];
          break;
        case 6:
          // Sat
          hours = [
            this.activeTime(this.dateLaterDays(today, -6)),
            this.activeTime(this.dateLaterDays(today, -5)),
            this.activeTime(this.dateLaterDays(today, -4)),
            this.activeTime(this.dateLaterDays(today, -3)),
            this.activeTime(this.dateLaterDays(today, -2)),
            this.activeTime(this.dateLaterDays(today, -1)),
            this.activeTime(today),
          ];
          break;
        default:
          hours = [0, 0, 0, 0, 0, 0, 0];
          break;
      }

      this.collaboratorsTasks;
      return hours;
    },
    collaboratorsTasks() {
      const tasks = this.$store.state.tasks;
      const allCollaborators = this.$store.state.collaborators;

      const numberCollaboratorsTasks = tasks.reduce((acc, task) => {
        const { collaboratorId, done, timeTrackers } = task;
        if (collaboratorId in acc) {
          const { completedTasks, startedTasks, toDoTasks } =
            acc[collaboratorId].status;
          if (done) {
            acc[collaboratorId].status.completedTasks = completedTasks + 1;
          } else if (timeTrackers.length > 0) {
            acc[collaboratorId].status.startedTasks = startedTasks + 1;
          } else {
            acc[collaboratorId].status.toDoTasks = toDoTasks + 1;
          }
        } else {
          const status = {
            completedTasks: done ? 1 : 0,
            startedTasks: !done && timeTrackers.length > 0 ? 1 : 0,
            toDoTasks: !done && timeTrackers.length === 0 ? 1 : 0,
          };
          acc[collaboratorId] = { collaboratorId, status };
        }
        return acc;
      }, {});

      const radar = {
        labels: [],
        completedTasks: [],
        startedTasks: [],
        toDoTasks: [],
      };

      for (const collaborator of Object.values(numberCollaboratorsTasks)) {
        const collaboratorAux = allCollaborators.find(
          (el) => el.id === collaborator.collaboratorId
        );
        radar.labels.push(collaboratorAux?.name || "Sem colaborador");
        radar.completedTasks.push(collaborator.status.completedTasks);
        radar.startedTasks.push(collaborator.status.startedTasks);
        radar.toDoTasks.push(collaborator.status.toDoTasks);
      }

      return radar;
    },
    statusTasks() {
      const tasks = this.$store.state.tasks;
      let completedTasks = [];
      let startedTasks = [];
      let toDoTasks = [];

      tasks.forEach((task) => {
        if (task.done == true) {
          completedTasks.push(task);
        } else if (task.done == false && task.timeTrackers.length > 0) {
          startedTasks.push(task);
        } else {
          toDoTasks.push(task);
        }
      });

      let filteredTasks = [
        completedTasks.length,
        startedTasks.length,
        toDoTasks.length,
      ];

      return filteredTasks;
    },
    amountTask() {
      const tasks = this.$store.state.tasks;
      const today = new Date();
      const dayOfWeek = today.getDay();

      const sunday = this.formatDate(
        new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() - dayOfWeek
        )
      );
      const monday = this.formatDate(
        new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() - dayOfWeek + 1
        )
      );
      const tuesday = this.formatDate(
        new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() - dayOfWeek + 2
        )
      );
      const wednesday = this.formatDate(
        new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() - dayOfWeek + 3
        )
      );
      const thursday = this.formatDate(
        new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() - dayOfWeek + 4
        )
      );
      const friday = this.formatDate(
        new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() - dayOfWeek + 5
        )
      );
      const saturday = this.formatDate(
        new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() - dayOfWeek + 6
        )
      );

      const sundayTasks = [];
      const mondayTasks = [];
      const tuesdayTasks = [];
      const wednesdayTasks = [];
      const thursdayTasks = [];
      const fridayTasks = [];
      const saturdayTasks = [];

      tasks.forEach((task) => {
        switch (this.formatDate(task.createdAt)) {
          case sunday:
            sundayTasks.push(task);
            break;
          case monday:
            mondayTasks.push(task);
            break;
          case tuesday:
            tuesdayTasks.push(task);
            break;
          case wednesday:
            wednesdayTasks.push(task);
            break;
          case thursday:
            thursdayTasks.push(task);
            break;
          case friday:
            fridayTasks.push(task);
            break;
          case saturday:
            saturdayTasks.push(task);
            break;
        }
      });

      let amountTask = [
        sundayTasks.length,
        mondayTasks.length,
        tuesdayTasks.length,
        wednesdayTasks.length,
        thursdayTasks.length,
        fridayTasks.length,
        saturdayTasks.length,
      ];

      return amountTask;
    },
    cards() {
      this.activeThisWeek;
      const cards = [
        {
          title: "Colaboradores",
          number: this.$store.state.collaborators.length,
          icon: "mdi-account",
        },
        {
          title: "Projetos",
          number: this.$store.state.projects.length,
          icon: "mdi-note-edit-outline",
        },
        {
          title: "Tarefas",
          number: this.$store.state.tasks.length,
          icon: "mdi-calendar-check-outline",
        },
        {
          title: "Tempo ativo hoje",
          number: this.activeToday,
          icon: "mdi-clock-time-four-outline",
        },
      ];
      return cards;
    },
    pieData() {
      const chartData = {
        labels: ["Tarefas concluídas", "Tarefas iniciadas", "Tarefas a fazer"],
        datasets: [
          {
            backgroundColor: ["#bd7fff", "#7a97ff", "#7ce9ff"],
            data: this.statusTasks,
          },
        ],
      };
      return chartData;
    },
    pieOptions() {
      const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
      };
      return chartOptions;
    },
    radarData() {
      const chartData = {
        labels: this.collaboratorsTasks.labels,
        datasets: [
          {
            label: "Tarefas concluídas",
            backgroundColor: "rgba(123,0,255,0.2)",
            borderColor: "rgba(123,0,255,1)",
            pointBackgroundColor: "rgba(123,0,255,1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(123,0,255,1)",
            data: this.collaboratorsTasks.completedTasks,
          },
          {
            label: "Tarefas iniciadas",
            backgroundColor: "rgba(0,59,255,0.2)",
            borderColor: "rgba(0,59,255,1)",
            pointBackgroundColor: "rgba(0,59,255,1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(0,59,255,1)",
            data: this.collaboratorsTasks.startedTasks,
          },
          {
            label: "Tarefas a fazer",
            backgroundColor: "rgba(0,212,255,0.2)",
            borderColor: "rgba(0,212,255,1)",
            pointBackgroundColor: "rgba(0,212,255,1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(0,212,255,1)",
            data: this.collaboratorsTasks.toDoTasks,
          },
        ],
      };
      return chartData;
    },
    radarOptions() {
      const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
      };
      return chartOptions;
    },
    lineData() {
      const chartData = {
        labels: [
          "Domingo",
          "Segunda",
          "Terça",
          "Quarta",
          "Quinta",
          "Sexta",
          "Sábado",
        ],
        datasets: [
          {
            label: "Horas ativas",
            backgroundColor: "#7ce9ff",
            data: this.activeThisWeek,
          },
        ],
      };
      return chartData;
    },
    lineOptions() {
      const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
      };
      return chartOptions;
    },
    barData() {
      const chartData = {
        labels: [
          "Domingo",
          "Segunda",
          "Terça",
          "Quarta",
          "Quinta",
          "Sexta",
          "Sábado",
        ],
        datasets: [
          {
            label: "Tarefas criadas",
            backgroundColor: "#bd7fff",
            data: this.amountTask,
          },
        ],
      };
      return chartData;
    },
    barOptions() {
      const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
      };
      return chartOptions;
    },
  },
  methods: {
    formatDate(dateStr) {
      var date = new Date(dateStr);

      var day = date.getDate();
      var month = date.getMonth() + 1;
      var year = date.getFullYear();

      if (day < 10) {
        day = "0" + day;
      }
      if (month < 10) {
        month = "0" + month;
      }

      return day + "-" + month + "-" + year;
    },
    activeTime(date) {
      const day = new Date(date).toLocaleDateString();
      const tasks = this.$store.state.tasks;
      let filteredTimeTrackers = [];

      tasks.forEach((task) => {
        const taskTimeTrackerFiltered = task.timeTrackers.filter(
          (tracker) => new Date(tracker.startDate).toLocaleDateString() === day
        );
        filteredTimeTrackers.push(...taskTimeTrackerFiltered);
      });
      const times = filteredTimeTrackers.map(
        (timeTracker) => timeTracker.endDate - timeTracker.startDate
      );
      const sum = times.reduce((total, time) => total + time, 0);

      const hours = Math.floor((sum / (1000 * 60 * 60)) % 24)
        .toString()
        .padStart(2, "0");

      return hours;
    },
    dateLaterDays(today, laterDays) {
      let date = new Date(today);
      date.setDate(date.getDate() + laterDays);
      return date;
    },
  },
};
</script>

<style></style>
