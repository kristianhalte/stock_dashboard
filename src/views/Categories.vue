<template>
  <div>
    <Breadcrumb :key="port_id" :data="breadcrumb" />
    <div class="columns">
      <div class="column is-two-fifths">
        <div class="section">
          <p class="subtitle is-4" v-if="loading">{{ $t('loading') }}</p>
          <DoughnutChart
            v-else
            :key="cat_id"
            :chartData="doughnutChartData"
            :label="label"
            :value="value"
          />
        </div>
      </div>
      <div class="column is-three-fifths">
        <div class="section">
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
        <div class="section">
          <div>
            <p v-if="loading">{{ $t('loading') }}</p>
            <PlotChart
              v-else
              :key="cat_id + dateRange"
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
            :key="cat_id + dateRange"
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
  name: 'categories',
  components: {
    Breadcrumb,
    DoughnutChart,
    Dashboard,
    PlotChart,
    SlicesTable,
  },
  props: ['port_id', 'cat_id'],
  data() {
    return {
      route: null,
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
          isLast: false,
        },
        {
          id: 2,
          name: this.cat_id,
          href: '/portfolios/' + this.port_id + '/categories/' + this.cat_id,
          isLast: true,
        },
      ],
    }
  },
  watch: {
    cat_id: function(cat_id) {
      this.breadcrumb = [
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
          isLast: false,
        },
        {
          id: 2,
          name: cat_id,
          href: '/portfolios/' + this.port_id + '/categories/' + cat_id,
          isLast: true,
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
      return this.$store.getters.categoryLabel(this.port_id, this.cat_id)
    },
    value() {
      return this.$store.getters.categoryValue(this.port_id, this.cat_id)
    },
    gain() {
      return this.$store.getters.categoryGain(
        this.port_id,
        this.cat_id,
        this.dateRange
      )
    },
    dividend() {
      return this.$store.getters.categoryDividend(
        this.port_id,
        this.cat_id,
        this.dateRange
      )
    },
    returns() {
      return this.$store.getters.categoryReturns(
        this.port_id,
        this.cat_id,
        this.dateRange
      )
    },
    doughnutChartData() {
      return this.$store.getters.categoryDoughnutChartData(
        this.port_id,
        this.cat_id
      )
    },
    plotChartData() {
      return this.$store.getters.categoryPlotChartData(
        this.port_id,
        this.cat_id,
        this.dateRange
      )
    },
    tableData() {
      return this.$store.getters.categoryTableData(
        this.port_id,
        this.cat_id,
        this.dateRange
      )
    },
  },
}
</script>
