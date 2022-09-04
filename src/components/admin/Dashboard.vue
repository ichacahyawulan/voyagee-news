<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card class="pa-5">
          <h3>Session per Region</h3>
          <div id="chart-session-region-container"></div>
        </v-card>
      </v-col>
      <v-col>
        <v-card class="pa-5">
          <h3>Users per day</h3>
          <div id="chart-user-day-container"></div>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card class="pa-5">
          <h3>Average Session Duration</h3>
          <div id="chart-average-session-duration-container"></div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DashboardService from "../../services/DashboardDataService";
export default {
  name: "Dashboard",
  methods: {
    async createDashboard() {
      const gapi = window.gapi;

      const accessToken = await DashboardService.getAccessToken();
      console.log(accessToken.data);
      await gapi.analytics.ready(function () {
        gapi.analytics.auth.authorize({
          serverAuth: {
            access_token: accessToken.data,
          },
        });
        var dataChart1 = new gapi.analytics.googleCharts.DataChart({
          query: {
            ids: "ga:235194524", // <-- Replace with the ids value for your view.
            "start-date": "90daysAgo",
            "end-date": "today",
            metrics: "ga:sessions",
            dimensions: "ga:country",
          },
          chart: {
            container: "chart-session-region-container",
            type: "GEO",
            options: {
              width: "100%",
            },
          },
        });
        var dataChart2 = new gapi.analytics.googleCharts.DataChart({
          query: {
            ids: "ga:235194524", // <-- Replace with the ids value for your view.
            "start-date": "30daysAgo",
            "end-date": "today",
            metrics: "ga:users",
            dimensions: "ga:date",
          },
          chart: {
            container: "chart-user-day-container",
            type: "LINE",
            options: {
              width: "100%",
            },
          },
        });
        var dataChart3 = new gapi.analytics.googleCharts.DataChart({
          query: {
            ids: "ga:235194524", // <-- Replace with the ids value for your view.
            "start-date": "7daysAgo",
            "end-date": "today",
            metrics: "ga:avgSessionDuration",
            dimensions: "ga:date",
          },
          chart: {
            container: "chart-average-session-duration-container",
            type: "LINE",
            options: {
              width: "100%",
            },
          },
        });
        dataChart1.execute();
        dataChart2.execute();
        dataChart3.execute();
      });
    },
  },
  mounted() {
    this.createDashboard();
  },
};
</script>