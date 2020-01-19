<template>
  <div class="columns">
    <div class="column">
      <!-- <DoughnutChart :chartdata="updatedDataArray" /> -->
    </div>
    <div class="column">
      <h2 class="title is-2">Test</h2>
      <div class="columns">
        <div class="column">
          <p class="title is-6">Test</p>
          <p class="subtitle is-4">$ 100.00</p>
        </div>
        <div class="column">
          <p class="title is-6 has-text-right">Test</p>
          <p class="subtitle is-4 has-text-right has-text-primary">+$ 200.00</p>
        </div>
        <div class="column">
          <p class="title is-6 has-text-right">Test</p>
          <p class="subtitle is-4 has-text-right has-text-primary">8 %</p>
        </div>
      </div>
      <div>
        <p v-if="loading">Loading...</p>
        <LineChart v-else :chartdata="updatedPortfolioLineChartDataset" />
      </div>
    </div>
  </div>
</template>

<script>
// import DoughnutChart from '@/components/charts/DoughnutChart.vue'
import LineChart from '@/components/charts/LineChart.vue'
import { getPortfolioLineChartDataset } from '@/helpers/helpers'

export default {
  name: 'home',
  components: {
    // DoughnutChart,
    LineChart,
  },
  computed: {
    updatedPortfolioLineChartDataset() {
      return getPortfolioLineChartDataset(this.portfolioDataArray)
    },
    portfolioDataArray() {
      return this.$store.state.portfolioDataArray
    },
    loading() {
      return this.$store.state.loading
    },
  },
}
</script>
