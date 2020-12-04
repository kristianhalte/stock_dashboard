<template>
  <div>
    <div class="columns">
      <div class="column is-two-fifths">
        <div class="box">
          <p class="subtitle is-4" v-if="loading">{{ $t('loading') }}</p>
          <DoughnutChart
            v-else
            :key="'home'"
            :chartData="doughnutChartData"
            :label="label"
            :value="value"
          />
          <b-button type="is-primary" expanded>Small</b-button>
        </div>
      </div>
      <div class="column is-three-fifths">
        <div class="section">
          <p v-if="loading">{{ $t('loading') }}</p>
          <Dashboard
            v-else
            :key="dateRange"
            :loading="loading"
            :label="label"
            :value="value"
            :gain="gain"
            :dividend="dividend"
            :returns="returns"
          />
        </div>
        <div class="section">
          <div>
            <p v-if="loading">{{ $t('loading') }}</p>
            <PlotChart
              v-else
              :key="dateRange"
              :chartData="plotChartData"
              :label="label"
              :value="value"
            />
          </div>
        </div>
        <div class="section">
          <h2 class="title is-2">{{ $t('slices') }}</h2>
        </div>
        <div class="section">
          <p v-if="loading">{{ $t('loading') }}</p>
          <SlicesTable
            v-else
            :key="dateRange"
            :table-data="tableData"
            :route-to="route"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import DoughnutChart from '@/components/charts/DoughnutChart.vue'
import Dashboard from '@/components/Dashboard.vue'
import PlotChart from '@/components/charts/PlotChart.vue'
import SlicesTable from '@/components/SlicesTable.vue'
export default {
  name: 'home',
  components: {
    DoughnutChart,
    Dashboard,
    PlotChart,
    SlicesTable,
  },
  data() {
    return {
      route: 'portfolios',
    }
  },
  computed: {
    ...mapState({
      loading: state => state.loading,
      dateRange: state => state.dateRange,
    }),
    label() {
      return this.$store.getters.mainLabel
    },
    value() {
      return this.$store.getters.mainValue
    },
    gain() {
      return this.$store.getters.mainGain(this.dateRange)
    },
    dividend() {
      return this.$store.getters.mainDividend(this.dateRange)
    },
    returns() {
      return this.$store.getters.mainReturns(this.dateRange)
    },
    doughnutChartData() {
      return this.$store.getters.mainDoughnutChartData
    },
    plotChartData() {
      return this.$store.getters.mainPlotChartData(this.dateRange)
    },
    tableData() {
      return this.$store.getters.mainTableData(this.dateRange)
    },
  },
}
</script>
