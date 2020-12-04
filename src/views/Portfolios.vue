<template>
  <div>
    <div class="columns">
      <div class="column is-two-fifths">
        <div class="box">
          <p class="subtitle is-4" v-if="loading">{{ $t('loading') }}</p>
          <DoughnutChart
            v-else
            :key="port_id"
            :chartData="doughnutChartData"
            :label="label"
            :value="value"
          />
          <b-button type="is-primary" expanded>Small</b-button>
        </div>
      </div>
      <div class="column is-three-fifths">
        <div>
          <Breadcrumb :key="port_id" :data="breadcrumb" />
          <p v-if="loading">{{ $t('loading') }}</p>
          <Dashboard
            v-else
            :loading="loading"
            :label="label"
            :value="value"
            :gain="gain"
            :dividend="dividend"
            :returns="returns"
          />
        </div>
        <div>
          <div>
            <p v-if="loading">{{ $t('loading') }}</p>
            <PlotChart
              v-else
              :key="port_id + dateRange"
              :chartData="plotChartData"
              :label="label"
              :value="value"
            />
          </div>
        </div>
        <div>
          <h2 class="title is-2">{{ $t('slices') }}</h2>
        </div>
        <div>
          <p v-if="loading">{{ $t('loading') }}</p>
          <SlicesTable
            v-else
            :key="port_id + dateRange"
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
import Breadcrumb from '@/components/Breadcrumb.vue'
import DoughnutChart from '@/components/charts/DoughnutChart.vue'
import Dashboard from '@/components/Dashboard.vue'
import PlotChart from '@/components/charts/PlotChart.vue'
import SlicesTable from '@/components/SlicesTable.vue'
export default {
  name: 'portfolios',
  components: {
    Breadcrumb,
    DoughnutChart,
    Dashboard,
    PlotChart,
    SlicesTable,
  },
  props: ['port_id'],
  data() {
    return {
      route: 'portfolios/' + this.port_id + '/categories',
      breadcrumb: [
        {
          id: 0,
          name: 'My Portfolios',
          href: '/',
          isLast: false,
        },
        {
          id: 1,
          name: this.port_id,
          href: '/portfolios/' + this.port_id,
          isLast: true,
        },
      ],
    }
  },
  watch: {
    port_id: function(port_id) {
      this.route = 'portfolios/' + port_id + '/categories'
      this.breadcrumb = [
        {
          id: 0,
          name: 'My Portfolios',
          href: '/',
          isLast: false,
        },
        {
          id: 1,
          name: port_id,
          href: '/portfolios/' + port_id,
          isLast: false,
        },
      ]
    },
  },
  computed: {
    ...mapState({
      loading: state => state.loading,
      dateRange: state => state.dateRange,
    }),
    label() {
      return this.$store.getters.portfolioLabel(this.port_id)
    },
    value() {
      return this.$store.getters.portfolioValue(this.port_id)
    },
    gain() {
      return this.$store.getters.portfolioGain(this.port_id, this.dateRange)
    },
    dividend() {
      return this.$store.getters.portfolioDividend(this.port_id, this.dateRange)
    },
    returns() {
      return this.$store.getters.portfolioReturns(this.port_id, this.dateRange)
    },
    doughnutChartData() {
      return this.$store.getters.portfolioDoughnutChartData(this.port_id)
    },
    plotChartData() {
      return this.$store.getters.portfolioPlotChartData(
        this.port_id,
        this.dateRange
      )
    },
    tableData() {
      return this.$store.getters.portfolioTableData(
        this.port_id,
        this.dateRange
      )
    },
  },
}
</script>
