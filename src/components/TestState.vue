<template>
  <div>
    <p v-if="loading">Loading...</p>
    <LineChart v-else :chartdata="updatedPortfolioLineChartDataset" />
  </div>
</template>

<script>
import LineChart from '@/components/charts/LineChart.vue'
import { getPortfolioLineChartDataset } from '@/helpers/helpers'

export default {
  name: 'testState',
  components: {
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
